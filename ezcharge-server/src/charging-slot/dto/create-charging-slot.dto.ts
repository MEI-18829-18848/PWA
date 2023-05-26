import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationDto } from './reservation.dto';

export class CreateChargingSlotDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ReservationDto)
  reservation: ReservationDto;

  @ApiProperty()
  @IsBoolean()
  isAvailable: boolean;
}
