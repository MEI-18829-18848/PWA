import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface Reservation {
  user: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  totalPrice: number;
}

@Schema()
export class ChargingSlot {
  @Prop({ required: true })
  slotId: number;

  @Prop({ default: false })
  isOccupied: boolean;

  @Prop({ type: Object, default: {} }) // Specify the type as Object and provide a default value
  reservation: Reservation;

  @Prop({ default: true })
  isAvailable: boolean;
}

export type ChargingSlotDocument = ChargingSlot & Document;
export const ChargingSlotSchema = SchemaFactory.createForClass(ChargingSlot);
