import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethod } from './schemas/payment-method.schema';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find().exec();
  }

  async findById(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel.findById(id).exec();
  }

  async create(
    paymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = new PaymentMethod(paymentMethodDto);
    const createdStation = new this.paymentMethodModel(paymentMethod);
    return createdStation.save();
  }

  async update(
    id: string,
    paymentMethod: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodModel
      .findByIdAndUpdate(id, paymentMethod, { new: true })
      .exec();
  }

  async delete(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel.findByIdAndRemove(id).exec();
  }
}
