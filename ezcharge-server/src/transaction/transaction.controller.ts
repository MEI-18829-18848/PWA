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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../auth/user/user.guard';

@Controller('payment-method')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':pm_id/transaction')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Create a transaction' })
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  create(
    @Param('pm_id') paymentMethodId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(
      paymentMethodId,
      createTransactionDto,
    );
  }

  @Get(':pm_id/transaction')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  findAll(@Param('pm_id') paymentMethodId: string) {
    return this.transactionService.findAllFromPaymentMethod(paymentMethodId);
  }

  @Get(':pm_id/transaction/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  findOne(@Param('pm_id') paymentMethodId: string, @Param('id') id: string) {
    return this.transactionService.findById(paymentMethodId, id);
  }

  @Patch(':pm_id/transaction/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  update(
    @Param('pm_id') paymentMethodId: string,
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(
      paymentMethodId,
      id,
      updateTransactionDto,
    );
  }

  @Delete(':pm_id/transaction/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'pm_id', description: 'The ID of the payment method' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  remove(@Param('pm_id') paymentMethodId: string, @Param('id') id: string) {
    return this.transactionService.delete(paymentMethodId, id);
  }
}
