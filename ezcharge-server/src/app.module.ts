import { Module } from '@nestjs/common';
import { ChargingStationModule } from './charging-station/charging-station.module';
import { ChargingSlotModule } from './charging-slot/charging-slot.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChargingStationModule,
    ChargingSlotModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
  ],
})
export class AppModule {}
