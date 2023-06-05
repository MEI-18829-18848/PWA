import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  totalKW: number;

  @ApiProperty()
  @IsNumber()
  pricePerKw: number;
}
