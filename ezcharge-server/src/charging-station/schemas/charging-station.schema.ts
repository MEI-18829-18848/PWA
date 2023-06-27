import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from '../../charging-slot/schemas/charging-slot.schema';
import { LocationDto } from '../dto/location.dto';

class OperationTime {
  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;
}

@Schema()
export class ChargingStation extends Document {
  @ApiProperty()
  @Prop({type: Buffer, default:null})
  image: Buffer

  @ApiProperty()
  @Prop({type: String, default: null})
  mimeType: string

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  owner: string;

  @ApiProperty({ type: LocationDto })
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
  location: LocationDto;

  @ApiProperty()
  @Prop({ required: true })
  address: string;

  @ApiProperty({ type: [ChargingSlot] })
  @Prop({ type: [ChargingSlotSchema] })
  slots: ChargingSlot[];

  @ApiProperty({ type: OperationTime })
  @Prop({ type: OperationTime })
  operationTime: OperationTime;

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

  // slot properties
  @ApiProperty()
  kwhCapacity: number;

  @ApiProperty()
  plugType: string;

  @ApiProperty()
  pricePerKw: number;
}

export const ChargingStationSchema =
  SchemaFactory.createForClass(ChargingStation);
