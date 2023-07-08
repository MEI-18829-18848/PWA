import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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

  async findAll(user: string): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find({ user }).exec();
  }

  async findById(user: string, id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodModel.findOne({ _id: id, user }).exec();

    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }

    return paymentMethod;
  }
  async create(
    user: string,
    paymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    paymentMethodDto.user = user
    const createdPaymentMethod = new this.paymentMethodModel(paymentMethodDto);
    return createdPaymentMethod.save();
  }

  async update(
    user: string,
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.findById(user, id); // use the modified findById

    updatePaymentMethodDto.user = user
    paymentMethod.cardName = updatePaymentMethodDto.cardName
    paymentMethod.cardNumber = updatePaymentMethodDto.cardNumber
    paymentMethod.defaultMethod = updatePaymentMethodDto.defaultMethod

    await paymentMethod.save()
    return paymentMethod
  }

  async delete(user: string, id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.findById(user, id); // use the modified findById

    return this.paymentMethodModel.findByIdAndRemove(id).exec();
  }
}
