import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { PaymentMethod } from "../payment-method/schemas/payment-method.schema";
import { Reservation } from "../reservation/schemas/reservation.schema";
import { ChargingStation } from "../charging-station/schemas/charging-station.schema";
import { ChargingSlot } from "../charging-slot/schemas/charging-slot.schema";
import { ReservationService } from "../reservation/reservation.service";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethod>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
    private readonly reservationService: ReservationService, // No need for @Inject() decorator here
  ) {}

  async create(
    userId: string,
    paymentMethodId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ _id: paymentMethodId, user: userId })
      .exec();

    if (!paymentMethod) {
      throw new Error('No payment method found or you do not have access to it');
    }

    const transaction = new this.transactionModel(createTransactionDto);
    paymentMethod.transactions.push(transaction);

    await paymentMethod.save();

    return transaction;
  }

  async findAllFromPaymentMethod(
    userId: string,
    paymentMethodId: string,
  ): Promise<any[]> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ _id: paymentMethodId, user: userId })
      .exec();

    if (!paymentMethod) {
      throw new Error('No payment method found or you do not have access to it');
    }

    return paymentMethod.transactions.map((transaction) => ({
      paymentMethod: {
        id: paymentMethod._id,
        cardNumber: paymentMethod.cardNumber,
        expirationDate: paymentMethod.expirationDate,
        defaultMethod: paymentMethod.defaultMethod,
        cardName: paymentMethod.cardName
      },
      amount: transaction.amount,
      timeStamp: transaction.timeStamp,
      type: transaction.type,
      _id: transaction._id
    }));
  }

  async findById(
    userId: string,
    paymentMethodId: string,
    id: string,
  ): Promise<any> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ _id: paymentMethodId, user: userId })
      .exec();

    if (!paymentMethod) {
      throw new Error('No payment method found or you do not have access to it');
    }

    const transactionIdx = paymentMethod.transactions.findIndex(
      (s) => s._id.toString() === id,
    );

    if (transactionIdx === -1) {
      throw new Error('Transaction not found');
    }

    const transaction = paymentMethod.transactions[transactionIdx]

    return {
      paymentMethod: {
        id: paymentMethod._id,
        cardNumber: paymentMethod.cardNumber,
        expirationDate: paymentMethod.expirationDate,
        defaultMethod: paymentMethod.defaultMethod,
        cardName: paymentMethod.cardName
      },
      amount: transaction.amount,
      timeStamp: transaction.timeStamp,
      type: transaction.type,
      _id: transaction._id
    };
  }

  async update(
    userId: string,
    paymentMethodId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<any> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ _id: paymentMethodId, user: userId })
      .exec();

    if (!paymentMethod) {
      throw new Error('No payment method found or you do not have access to it');
    }

    const transactionIndex = paymentMethod.transactions.findIndex(
      (s) => s._id.toString() === id,
    );

    if (transactionIndex === -1) {
      throw new Error('Transaction not found');
    }

    const transaction = new Transaction(UpdateTransactionDto);
    paymentMethod[transactionIndex]= transaction
    await paymentMethod.save();
    return transaction;
  }

  async delete(userId: string, paymentMethodId: string, id: string): Promise<any> {
    const paymentMethod = await this.paymentMethodModel
      .findOne({ _id: paymentMethodId, user: userId })
      .exec();

    if (!paymentMethod) {
      throw new Error('No payment method found or you do not have access to it');
    }

    const transactionIndex = paymentMethod.transactions.findIndex(
      (s) => s._id.toString() === id,
    );
    if (transactionIndex === -1) {
      throw new Error('Transaction not found');
    }

    const deletedTransaction = paymentMethod.transactions[transactionIndex];
    paymentMethod.transactions.splice(transactionIndex, 1);
    await paymentMethod.save();
    return deletedTransaction;
  }

  async findAllTransactions(userId: string) {
    const paymentMethods = await this.paymentMethodModel
      .find({ user: userId })
      .exec();

    if (!paymentMethods.length) {
      throw new Error('No payment methods found or you do not have access to them');
    }

    const allTransactions = [];
    for (const paymentMethod of paymentMethods) {
      if (!paymentMethod.transactions) {
        console.error(`No transactions found for payment method ${paymentMethod._id}`);
        continue;
      }

      for (const transaction of paymentMethod.transactions) {
        let reservation;
        try {
          reservation = await this.reservationService.findReservationByTransactionId(transaction._id);
        } catch (error) {
          console.error(`Error finding reservation for transaction ${transaction._id}: ${error.message}`);
          reservation = {};
        }

        allTransactions.push({
          paymentMethod: {
            id: paymentMethod._id,
            cardNumber: paymentMethod.cardNumber,
            expirationDate: paymentMethod.expirationDate,
            defaultMethod: paymentMethod.defaultMethod,
            cardName: paymentMethod.cardName
          },
          amount: transaction.amount,
          timeStamp: transaction.timeStamp,
          type: transaction.type,
          _id: transaction._id,
          reservation: reservation
        });
      }
    }

    return allTransactions;
  }


}