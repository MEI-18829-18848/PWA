import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ChargingStationModule } from '../charging-station/charging-station.module';
import { ChargingSlotModule } from '../charging-slot/charging-slot.module';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChargingStation,
  ChargingStationSchema,
} from '../charging-station/schemas/charging-station.schema';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from '../charging-slot/schemas/charging-slot.schema';

@Module({
  imports: [
    ChargingStationModule,
    ChargingSlotModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: ChargingStation.name, schema: ChargingStationSchema },
      { name: ChargingSlot.name, schema: ChargingSlotSchema },
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
