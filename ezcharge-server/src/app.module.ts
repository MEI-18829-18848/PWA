import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChargingStationModule } from './charging-station/charging-station.module';
import { ChargingSlotModule } from './charging-slot/charging-slot.module';

@Module({
  imports: [ChargingStationModule, ChargingSlotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
