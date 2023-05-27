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
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateChargingSlotDto } from './dto/create-charging-slot.dto';
import { UpdateChargingSlotDto } from './dto/update-charging-slot.dto';

@Controller('charging-stations')
@ApiTags('Charging Stations')
export class ChargingSlotController {
  constructor(private chargingSlotService: ChargingSlotService) {}

  @Get('/:id/slots')
  @ApiOperation({ summary: 'Find all charging slots from a station' })
  @ApiParam({ name: 'id', description: 'Station ID' })
  findAllFromPostID(@Param('id') id: string): Promise<ChargingSlot[]> {
    return this.chargingSlotService.findAllFromStation(id);
  }

  @Get('/:id/slots/:slot_id')
  @ApiOperation({ summary: 'Find a charging slot by ID' })
  @ApiParam({ name: 'id', description: 'Station ID' })
  @ApiParam({ name: 'slot_id', description: 'Slot ID' })
  findById(
    @Param('id') station_id: string,
    @Param('slot_id') slot_id: string,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.findById(station_id, slot_id);
  }

  @Post('/:id/slots')
  @ApiOperation({ summary: 'Create a new charging slot' })
  @ApiParam({ name: 'id', description: 'Station ID' })
  @ApiBody({ type: CreateChargingSlotDto })
  create(
    @Param('id') id: string,
    @Body() chargingSlotDto: CreateChargingSlotDto,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.create(id, chargingSlotDto);
  }

  @Patch('/:id/slots/:slot_id')
  @ApiOperation({ summary: 'Update a charging slot' })
  @ApiParam({ name: 'id', description: 'Station ID' })
  @ApiParam({ name: 'slot_id', description: 'Slot ID' })
  @ApiBody({ type: UpdateChargingSlotDto })
  update(
    @Param('id') id: string,
    @Param('slot_id') slot_id: string,
    @Body() chargingSlotDto: UpdateChargingSlotDto,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.update(id, slot_id, chargingSlotDto);
  }

  @Delete('/:id/slots/:slot_id')
  @ApiOperation({ summary: 'Delete a charging slot' })
  @ApiParam({ name: 'id', description: 'Station ID' })
  @ApiParam({ name: 'slot_id', description: 'Slot ID' })
  delete(
    @Param('id') id: string,
    @Param('slot_id') slot_id: string,
  ): Promise<ChargingSlot> {
    return this.chargingSlotService.delete(id, slot_id);
  }
}
