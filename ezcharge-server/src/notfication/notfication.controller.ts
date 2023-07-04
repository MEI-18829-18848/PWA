import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notfication.dto';
import { CreatePushTokenDto } from './dto/create-notfication.dto';
import { FirebaseService } from './firebase.service';
import { NotificationService } from './notfication.service';
import { UserService } from './notfication.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const notification = await this.notificationService.create(
      createNotificationDto.title,
      createNotificationDto.body,
    );

    const users = await this.userService.findAll();
    users.forEach((user) => {
      this.firebaseService.sendNotification(
        user.pushToken,
        notification.title,
        notification.body,
      );
    });

    return notification;
  }

  @Post('token')
  async updatePushToken(@Body() createPushTokenDto: CreatePushTokenDto) {
    return await this.userService.updatePushToken(
      createPushTokenDto.userId,
      createPushTokenDto.pushToken,
    );
  }
}
