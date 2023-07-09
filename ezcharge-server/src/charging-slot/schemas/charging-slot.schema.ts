import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation, ReservationSchema } from "../../reservation/schemas/reservation.schema";

@Schema()
export class ChargingSlot extends Document {
  @ApiProperty({type: [Reservation]})
  @Prop({ type: [ReservationSchema] })
  reservations: Reservation[];
}

export const ChargingSlotSchema = SchemaFactory.createForClass(ChargingSlot);

