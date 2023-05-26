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
}

@Schema()
export class ChargingSlot extends Document {
  @ApiProperty()
  @Prop({ default: false })
  isOccupied: boolean;

  @ApiProperty()
  @Prop({ type: Reservation, default: {} })
  reservation: Reservation;

  @ApiProperty()
  @Prop({ default: true })
  isAvailable: boolean;
}

export const ChargingSlotSchema = SchemaFactory.createForClass(ChargingSlot);
