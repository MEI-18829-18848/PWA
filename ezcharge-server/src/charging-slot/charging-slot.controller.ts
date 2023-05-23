import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChargingSlotService } from './charging-slot.service';
import { ChargingSlot } from './schemas/charging-slot.schema';

@Controller('charging-station/')
export class ChargingSlotController {
  constructor(private chargingSlotService: ChargingSlotService) {}

  @Get(':id/slots')
  findAllFromPostID(id: string): Promise<ChargingSlot[]> {
    return this.chargingSlotService.findAllFromStation(id);
  }

  @Get(':id/slots/:slot_id')
  findById(
    @Param('id') station_id: string,
    @Param('slot_id') slot_id: string,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.findById(station_id, slot_id);
  }

  @Post(':id/slots')
  create(
    @Param('id') id: string,
    @Body() chargingSlot: ChargingSlot,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.create(id, chargingSlot);
  }

  @Patch(':id/slots/:slot_id')
  update(
    @Param('id') id: string,
    @Param('slot_id') slot_id: string,
    @Body() chargingSlot: ChargingSlot,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.update(id, slot_id, chargingSlot);
  }

  @Delete(':id/slots/:slot_id')
  delete(
    @Param('id') id: string,
    @Param('slot_id') slot_id: string,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.delete(id, slot_id);
  }
}
