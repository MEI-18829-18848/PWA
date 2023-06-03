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

export class UpdateChargingStationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty()
  @IsNotEmpty()
  owner: string;

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
