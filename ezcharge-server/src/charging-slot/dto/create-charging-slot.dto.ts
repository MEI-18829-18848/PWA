import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Reservation } from "../../reservation/schemas/reservation.schema";

export class CreateChargingSlotDto {
  @ApiProperty()
  reservations: Reservation[];
}
