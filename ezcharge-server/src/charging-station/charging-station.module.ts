import { Module } from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStationController } from './charging-station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargingStation,
  ChargingStationSchema,
} from './schemas/charging-station.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChargingStation.name, schema: ChargingStationSchema },
    ]),
  ],
  controllers: [ChargingStationController],
  providers: [ChargingStationService],
})
export class ChargingStationModule {}
