import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { ApiOperation, ApiParam, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserGuard } from "../auth/user/user.guard";

interface JwtPayload {
  user_id: string;
}

@Controller('payment-method')
@ApiTags('Payment Methods')
@ApiBearerAuth() // Enable JWT authentication in Swagger UI
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  private getUserIdFromToken(token: string): string {
    try {
      const decoded = jwt.decode(token.split(' ')[1]) as JwtPayload;
      return decoded?.user_id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Create a payment method' })
  @ApiResponse({ status: 201, description: 'The payment method has been successfully created.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  create(@Headers('authorization') token: string, @Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    const userId = this.getUserIdFromToken(token);
    return this.paymentMethodService.create(userId, createPaymentMethodDto);
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all payment methods' })
  @ApiResponse({ status: 200, description: 'Return all payment methods for a specific user.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  findAll(@Headers('authorization') token: string) {
    const userId =  this.getUserIdFromToken(token);
    return this.paymentMethodService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get a payment method by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  @ApiResponse({ status: 200, description: 'Return the payment method for a specific ID.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  findOne(@Headers('authorization') token: string, @Param('id') id: string) {
    const userId =  this.getUserIdFromToken(token);
    return this.paymentMethodService.findById(userId, id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update a payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  @ApiResponse({ status: 200, description: 'The payment method has been successfully updated.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  update(
    @Headers('authorization') token: string,
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    const userId =  this.getUserIdFromToken(token);
    return this.paymentMethodService.update(userId, id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete a payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the payment method' })
  @ApiResponse({ status: 200, description: 'The payment method has been successfully deleted.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  remove(@Headers('authorization') token: string, @Param('id') id: string) {
    const userId =  this.getUserIdFromToken(token);
    return this.paymentMethodService.delete(userId, id);
  }
}
