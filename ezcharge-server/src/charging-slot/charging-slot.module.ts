import { Module } from '@nestjs/common';
import { ChargingSlotService } from './charging-slot.service';
import { ChargingSlotController } from './charging-slot.controller';

@Module({
  controllers: [ChargingSlotController],
  providers: [ChargingSlotService],
})
export class ChargingSlotModule {}
