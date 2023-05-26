import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './schemas/charging-station.schema';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateChargingSlotDto } from '../charging-slot/dto/create-charging-slot.dto';
import { CreateChargingStationDto } from './dto/create-charging-station.dto';
import { UpdateChargingStationDto } from './dto/update-charging-station.dto';

@Controller('charging-stations')
@ApiTags('Charging Stations')
export class ChargingStationController {
  constructor(private chargingStationService: ChargingStationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all charging stations' })
  findAll(): Promise<ChargingStation[]> {
    return this.chargingStationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a charging station by ID' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  findById(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new charging station' })
  @ApiBody({ type: CreateChargingSlotDto })
  create(
    @Body() chargingStation: CreateChargingStationDto,
  ): Promise<ChargingStation> {
    return this.chargingStationService.create(chargingStation);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a charging station' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  @ApiBody({ type: UpdateChargingStationDto })
  update(
    @Param('id') id: string,
    @Body() chargingStationDto: UpdateChargingStationDto,
  ): Promise<ChargingStation> {
    return this.chargingStationService.update(id, chargingStationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a charging station' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  delete(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.delete(id);
  }
}
