import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  Transaction,
  TransactionSchema,
} from '../../transaction/schemas/transaction.schema';
@Schema()
export class PaymentMethod extends Document {
  @ApiProperty()
  @Prop({ required: true })
  user: string;

  @ApiProperty()
  @Prop({ required: true })
  cardNumber: string;

  @ApiProperty()
  @Prop({ required: true })
  expirationDate: string;

  @ApiProperty()
  @Prop({ required: true })
  defaultMethod: boolean;

  @ApiProperty({ type: [Transaction] })
  @Prop({ type: [TransactionSchema] })
  transactions: Transaction[];
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
