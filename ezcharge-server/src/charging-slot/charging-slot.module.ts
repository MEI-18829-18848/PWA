import { Module } from '@nestjs/common';
import { ChargingSlotService } from './charging-slot.service';
import { ChargingSlotController } from './charging-slot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from './schemas/charging-slot.schema';
import { ChargingStationModule } from '../charging-station/charging-station.module';
import {
  ChargingStation,
  ChargingStationSchema,
} from '../charging-station/schemas/charging-station.schema';

@Module({
  imports: [
    ChargingStationModule,
    MongooseModule.forFeature([
      { name: ChargingSlot.name, schema: ChargingSlotSchema },
      { name: ChargingStation.name, schema: ChargingStationSchema },
    ]),
  ],
  controllers: [ChargingSlotController],
  providers: [ChargingSlotService],
})
export class ChargingSlotModule {}
