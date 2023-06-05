import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '../../reservation/schemas/reservation.schema';

@Schema()
export class ChargingSlot extends Document {
  @ApiProperty()
  @Prop({ type: Reservation, default: {} })
  reservations: Reservation[];

  @ApiProperty()
  kwhCapacity: number;

  @ApiProperty()
  plugType: string;

  @ApiProperty()
  pricePerKw: number;
}

export const ChargingSlotSchema = SchemaFactory.createForClass(ChargingSlot);
