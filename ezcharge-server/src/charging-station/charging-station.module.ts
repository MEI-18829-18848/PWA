import { Module } from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStationController } from './charging-station.controller';

@Module({
  controllers: [ChargingStationController],
  providers: [ChargingStationService],
})
export class ChargingStationModule {}
