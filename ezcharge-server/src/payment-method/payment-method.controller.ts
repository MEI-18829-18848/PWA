import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../auth/user/user.guard';

@Controller('payment-method')
@ApiTags('Payment Methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Create a payment method' })
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all payment methods' })
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get a payment method by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findById(id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update a payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete a payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  remove(@Param('id') id: string) {
    return this.paymentMethodService.delete(id);
  }
}
