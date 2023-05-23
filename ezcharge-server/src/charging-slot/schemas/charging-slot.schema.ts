import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ChargingSlot {
  @Prop({ required: true })
  slotId: number;

  @Prop({ default: false })
  isOccupied: boolean;

  @Prop()
  reservation: {
    user: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalPrice: number;
  };

  @Prop({ default: true })
  isAvailable: boolean;
}
