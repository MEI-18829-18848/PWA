import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notfication.controller';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { User, UserSchema } from './schemas/notification.schema';
import { NotificationService } from './notfication.service';
import { UserService } from './notfication.service';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, UserService, FirebaseService],
})
export class NotificationModule {}
