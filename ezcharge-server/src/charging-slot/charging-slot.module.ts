import { Module } from '@nestjs/common';
import { ChargingSlotService } from './charging-slot.service';
import { ChargingSlotController } from './charging-slot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from './schemas/charging-slot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChargingSlot.name, schema: ChargingSlotSchema },
    ]),
  ],
  controllers: [ChargingSlotController],
  providers: [ChargingSlotService],
})
export class ChargingSlotModule {}
