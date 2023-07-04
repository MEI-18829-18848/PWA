import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
  User,
  UserDocument,
} from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(title: string, body: string): Promise<Notification> {
    const createdNotification = new this.notificationModel({
      title,
      body,
    });
    return createdNotification.save();
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async updatePushToken(userId: number, pushToken: string): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(
        { id: userId },
        { pushToken: pushToken },
        { new: true, upsert: true },
      )
      .exec();
  }

  async findOne(userId: number): Promise<User> {
    return this.userModel.findOne({ id: userId }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
