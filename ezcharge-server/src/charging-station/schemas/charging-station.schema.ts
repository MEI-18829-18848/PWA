import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from '../../charging-slot/schemas/charging-slot.schema';

class OperationTime {
  start: string;
  end: string;
}

@Schema()
export class ChargingStation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  availableSlots: number;

  @Prop({ required: true })
  totalSlots: number;

  @Prop({ type: [ChargingSlotSchema] }) // Use ChargingSlotSchema instead of ChargingSlot
  slots: ChargingSlot[];

  @Prop({ type: OperationTime })
  operationTime: OperationTime;

  @Prop({ default: false })
  maintenanceDetection: boolean;

  @Prop([
    {
      slotNumber: { type: Number, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ])
  unavailability: {
    slotNumber: number;
    startTime: Date;
    endTime: Date;
  }[];

  @Prop({ required: true })
  kWhCapacity: number;
}

export const ChargingStationSchema =
  SchemaFactory.createForClass(ChargingStation);
