import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationDto } from './reservation.dto';

export class CreateChargingSlotDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ReservationDto)
  reservation: ReservationDto;

  @ApiProperty()
  @IsNumber()
  kwhCapacity: number;

  @ApiProperty()
  @IsNotEmpty()
  plugType: string;

  @ApiProperty()
  @IsNumber()
  pricePerKw: number;
}
