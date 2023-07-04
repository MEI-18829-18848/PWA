import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreatePushTokenDto } from './dto/create-notification.dto';
import { FirebaseService } from './firebase.service';
import { NotificationService } from './notification.service';
import { UserService } from './notification.service';
import { UserGuard } from '../auth/user/user.guard';
import { AdminGuard } from '../auth/admin-guard/admin.guard';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Notification' })
  @ApiBody({ type: CreateNotificationDto })
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
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Push Token' })
  @ApiBody({ type: CreatePushTokenDto })
  async updatePushToken(@Body() createPushTokenDto: CreatePushTokenDto) {
    return await this.userService.updatePushToken(
      createPushTokenDto.userId,
      createPushTokenDto.pushToken,
    );
  }
}
