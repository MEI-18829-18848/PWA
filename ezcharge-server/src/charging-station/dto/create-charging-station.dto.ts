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

export class CreateChargingStationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNumber()
  availableSlots: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalSlots: number;

  @ApiProperty({ type: OperationTimeDto })
  @ValidateNested()
  @Type(() => OperationTimeDto)
  operationTime: OperationTimeDto;

  @ApiProperty()
  @IsBoolean()
  maintenanceDetection: boolean;

  @ApiProperty()
  unavailability: {
    slotNumber: number;
    startTime: Date;
    endTime: Date;
  }[];

  @ApiProperty()
  @IsNotEmpty()
  kWhCapacity: number;
}
