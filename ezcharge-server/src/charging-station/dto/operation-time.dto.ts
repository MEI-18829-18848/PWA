import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OperationTimeDto {
  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  end: string;
}
