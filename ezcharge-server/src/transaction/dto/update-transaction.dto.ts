import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { Prop } from '@nestjs/mongoose';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty()
  @Prop({ required: true })
  timeStamp: Date;

  @ApiProperty()
  @Prop({ required: true })
  amount: number;

  @ApiProperty()
  @Prop({ required: true })
  type: string;
}
