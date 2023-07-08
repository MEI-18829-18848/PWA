import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  cardName: string;

  @ApiProperty()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty()
  @IsNotEmpty()
  defaultMethod: boolean;
}
