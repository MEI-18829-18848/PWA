import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop()
  pushToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
