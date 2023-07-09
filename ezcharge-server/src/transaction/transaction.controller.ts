import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers, UseGuards
} from "@nestjs/common";
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserGuard } from "../auth/user/user.guard";

interface JwtPayload {
  user_id: string;
}

@Controller('payment-method')
@ApiTags('Transactions')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private getUserIdFromToken(token: string): string {
    try {
      const decoded = jwt.decode(token.split(' ')[1]) as JwtPayload;
      return decoded?.user_id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post(':pm_id/transaction')
  @ApiOperation({ summary: 'Create a transaction' })
  @UseGuards(UserGuard)
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  create(
    @Headers('authorization') token: string,
    @Param('pm_id') paymentMethodId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId = this.getUserIdFromToken(token);
    return this.transactionService.create(
      userId,
      paymentMethodId,
      createTransactionDto,
    );
  }

  @Get(':pm_id/transaction')
  @ApiOperation({ summary: 'Get all transactions' })
  @UseGuards(UserGuard)
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  findAll(
    @Headers('authorization') token: string,
    @Param('pm_id') paymentMethodId: string,
  ) {
    const userId = this.getUserIdFromToken(token);
    if(paymentMethodId != 'all'){
      return this.transactionService.findAllFromPaymentMethod(userId, paymentMethodId);
    }
    return  this.transactionService.findAllTransactions(userId);
  }

  @Get(':pm_id/transaction/:id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @UseGuards(UserGuard)
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  findOne(
    @Headers('authorization') token: string,
    @Param('pm_id') paymentMethodId: string,
    @Param('id') id: string,
  ) {
    const userId = this.getUserIdFromToken(token);
    return this.transactionService.findById(userId, paymentMethodId, id);
  }

  @Patch(':pm_id/transaction/:id')
  @ApiOperation({ summary: 'Update a transaction' })
  @UseGuards(UserGuard)
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  update(
    @Headers('authorization') token: string,
    @Param('pm_id') paymentMethodId: string,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const userId = this.getUserIdFromToken(token);
    return this.transactionService.update(
      userId,
      paymentMethodId,
      id,
      updateTransactionDto,
    );
  }

  @Delete(':pm_id/transaction/:id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @UseGuards(UserGuard)
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  remove(
    @Headers('authorization') token: string,
    @Param('pm_id') paymentMethodId: string,
    @Param('id') id: string,
  ) {
    const userId = this.getUserIdFromToken(token);
    return this.transactionService.delete(userId, paymentMethodId, id);
  }


}
