import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class CreateTransactionDto {
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
