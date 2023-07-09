import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @ApiProperty()
  @Prop()
  user: string;

  @ApiProperty()
  @Prop()
  startTime: Date;

  @ApiProperty()
  @Prop()
  endTime: Date;

  @ApiProperty()
  @Prop()
  duration: number;

  @ApiProperty()
  @Prop()
  totalPrice: number;

  @ApiProperty()
  @Prop()
  transactionId: string;

  @ApiProperty()
  @Prop()
  paymentMethodId: string;

  @ApiProperty()
  @Prop()
  totalKW: number;

  @ApiProperty()
  @Prop()
  pricePerKw: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
