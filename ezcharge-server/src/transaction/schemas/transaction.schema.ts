import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Transaction extends Document {
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

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
