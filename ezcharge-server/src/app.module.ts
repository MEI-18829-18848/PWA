import { Module } from '@nestjs/common';
import { ChargingStationModule } from './charging-station/charging-station.module';
import { ChargingSlotModule } from './charging-slot/charging-slot.module';

@Module({
  imports: [ChargingStationModule, ChargingSlotModule],
})
export class AppModule {}
