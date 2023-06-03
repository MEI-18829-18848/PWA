import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';
import { OperationTimeDto } from './operation-time.dto';
import { Prop } from '@nestjs/mongoose';

export class CreateChargingStationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: OperationTimeDto })
  @ValidateNested()
  @Type(() => OperationTimeDto)
  operationTime: OperationTimeDto;

  @ApiProperty()
  unavailability: {
    slotNumber: number;
    startTime: Date;
    endTime: Date;
  }[];
}
