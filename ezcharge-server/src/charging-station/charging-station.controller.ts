import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './schemas/charging-station.schema';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateChargingStationDto } from './dto/create-charging-station.dto';
import { UpdateChargingStationDto } from './dto/update-charging-station.dto';
import { AdminGuard } from '../auth/admin-guard/admin.guard';
import { UserGuard } from '../auth/user/user.guard';

@Controller('charging-stations')
@ApiTags('Charging Stations')
export class ChargingStationController {
  constructor(private chargingStationService: ChargingStationService) {}

  @Get()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all charging stations' })
  findAll(): Promise<ChargingStation[]> {
    return this.chargingStationService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get a charging station by ID' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  findById(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.findById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new charging station' })
  @ApiBody({ type: CreateChargingStationDto })
  create(
    @Body() chargingStation: CreateChargingStationDto,
  ): Promise<ChargingStation> {
    return this.chargingStationService.create(chargingStation);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
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
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a charging station' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  delete(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.delete(id);
  }
}
