import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from '../../charging-slot/schemas/charging-slot.schema';

class OperationTime {
  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;
}

class Location {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}

@Schema()
export class ChargingStation extends Document {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: Location })
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
  location: Location;

  @ApiProperty()
  @Prop({ required: true })
  address: string;

  @ApiProperty()
  @Prop({ default: 0 })
  availableSlots: number;

  @ApiProperty()
  @Prop({ required: true })
  totalSlots: number;

  @ApiProperty({ type: [ChargingSlot] })
  @Prop({ type: [ChargingSlotSchema] })
  slots: ChargingSlot[];

  @ApiProperty({ type: OperationTime })
  @Prop({ type: OperationTime })
  operationTime: OperationTime;

  @ApiProperty()
  @Prop({ default: false })
  maintenanceDetection: boolean;

  @ApiProperty()
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

  @ApiProperty()
  @Prop({ required: true })
  kWhCapacity: number;
}

export const ChargingStationSchema =
  SchemaFactory.createForClass(ChargingStation);
