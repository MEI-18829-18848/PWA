import { ApiProperty } from '@nestjs/swagger';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @ApiProperty()
  user: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  transactionId: string;

  @ApiProperty()
  paymentMethodId: string;

  @ApiProperty()
  totalKW: number;

  @ApiProperty()
  pricePerKw: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
