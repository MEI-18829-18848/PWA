import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class ReservationDto {
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
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
