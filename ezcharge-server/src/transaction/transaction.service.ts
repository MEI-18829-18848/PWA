import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { PaymentMethod } from '../payment-method/schemas/payment-method.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethod>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  async findAllFromPaymentMethod(
    paymentMethodId: string,
  ): Promise<Transaction[]> {
    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();

    if (!paymentMethod) {
      throw new Error('payment method not found');
    }

    return paymentMethod.transactions;
  }

  async findById(
    paymentMethodId: string,
    transactionId: string,
  ): Promise<Transaction> {
    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();

    if (!paymentMethod) {
      throw new Error('payment method not found');
    }

    const transaction = paymentMethod.transactions.find(
      (s) => s._id.toString() === transactionId,
    );
    if (!transaction) {
      throw new Error('transaction not found');
    }

    return transaction;
  }

  async create(
    paymentMethodId: string,
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();

    if (!paymentMethod) {
      throw new Error('Payment Method not found');
    }

    const transaction = new Transaction(transactionDto);

    paymentMethod.transactions.push(transaction);
    await paymentMethod.save();
    return transaction;
  }

  async update(
    paymentMethodId: string,
    transactionId: string,
    transactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();

    if (!paymentMethod) {
      throw new Error('Payment Method not found');
    }

    const transactionIndex = paymentMethod.transactions.findIndex(
      (s) => s._id.toString() === transactionId,
    );
    if (transactionIndex === -1) {
      throw new Error('Transaction not found');
    }

    const transaction = new Transaction(transactionDto);

    paymentMethod.transactions[transactionIndex] = transaction;
    await paymentMethod.save();
    return transaction;
  }

  async delete(
    paymentMethodId: string,
    transactionId: string,
  ): Promise<Transaction> {
    const paymentMethod = await this.paymentMethodModel
      .findById(paymentMethodId)
      .exec();

    if (!paymentMethod) {
      throw new Error('Payment Method not found');
    }

    const transactionIndex = paymentMethod.transactions.findIndex(
      (s) => s._id.toString() === transactionId,
    );
    if (transactionIndex === -1) {
      throw new Error('Transaction not found');
    }

    const deletedTransaction = paymentMethod.transactions[transactionIndex];
    paymentMethod.transactions.splice(transactionIndex, 1);
    await paymentMethod.save();
    return deletedTransaction;
  }
}
