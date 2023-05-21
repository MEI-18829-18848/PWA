import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ChargingSlotService } from './charging-slot.service';
import { ChargingStation } from '../charging-station/schemas/charging-station.schema';
import { ChargingSlot } from './schemas/charging-slot.schema';

@Controller('charging-slots')
export class ChargingSlotController {
  constructor(private chargingSlotService: ChargingSlotService) {}

  @Get()
  findAll(): Promise<ChargingSlot[]> {
    return this.chargingSlotService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ChargingSlot> {
    return this.chargingSlotService.findById(id);
  }

  @Post()
  create(@Body() chargingSlot: ChargingSlot): Promise<ChargingSlot> {
    return this.chargingSlotService.create(chargingSlot);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() chargingSlot: ChargingSlot): Promise<ChargingSlot> {
    return this.chargingSlotService.update(id, chargingSlot);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ChargingSlot> {
    return this.chargingSlotService.delete(id);
  }
}
