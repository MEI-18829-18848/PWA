import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Reservation {
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
  totalKW: number;

  @ApiProperty()
  pricePerKw: number;
}

@Schema()
export class ChargingSlot extends Document {
  @ApiProperty()
  @Prop({ type: Reservation, default: {} })
  reservation: Reservation;

  @ApiProperty()
  kwhCapacity: number;

  @ApiProperty()
  plugType: string;

  @ApiProperty()
  pricePerKw: number;
}

export const ChargingSlotSchema = SchemaFactory.createForClass(ChargingSlot);
