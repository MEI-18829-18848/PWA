import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class  LocationDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  coordinates: number[];
}
