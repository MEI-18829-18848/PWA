import { Module } from '@nestjs/common';
import { ChargingStationModule } from './charging-station/charging-station.module';
import { ChargingSlotModule } from './charging-slot/charging-slot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ChargingStationModule,
    ChargingSlotModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ezcharge'),
    PaymentMethodModule,
    TransactionModule,
    ReservationModule,
    AuthModule,
  ],
})
export class AppModule {}
