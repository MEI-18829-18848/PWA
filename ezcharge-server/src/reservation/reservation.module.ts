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
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      publicKey:
        '-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzzoxvZLjeHF/FICV+rSV\n' +
        'DAApETIMD8xwbUFBs2y9zFrPi8zNe0I0NKe4AJM6jF/X5W31Ib/P/Ux64EBTnLro\n' +
        'NbTbwz7+P1RefKBcNqq0CEkG7BeDuCvnt3ln0Y58KtZlP+pazyb975Px1vzAS/zp\n' +
        'vM6lUX5jow3Frcvm7kixJnkDgDmMZ0reFJtiZFjPszZJVpu6feb+MxsJQgw41GqE\n' +
        'AXV5+cPLZpwmq64mLUPPagVvFCKpHO4HejhAGc4PFYXwBYkUzX9fnbV/LNzNXDb5\n' +
        'e51vLnl1YkCYIpHtco/2CZae4R7Oaic0a+m7YvA7xUMN/fGsMZ07agr8DZmp5xoC\n' +
        'WQIDAQAB\n' +
        '-----END PUBLIC KEY-----',
      signOptions: { expiresIn: '1h', algorithm: 'RS256' },
    }),
    AuthModule,
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
