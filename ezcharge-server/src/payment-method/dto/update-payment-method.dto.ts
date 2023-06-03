import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(
  CreatePaymentMethodDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty()
  @IsNotEmpty()
  defaultMethod: boolean;
}
