import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateChargingSlotDto {
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
