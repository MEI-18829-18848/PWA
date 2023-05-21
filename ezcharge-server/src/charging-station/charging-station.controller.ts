import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './schemas/charging-station.schema';

@Controller('charging-stations')
export class ChargingStationController {
  constructor(private chargingStationService: ChargingStationService) {}

  @Get()
  findAll(): Promise<ChargingStation[]> {
    return this.chargingStationService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.findById(id);
  }

  @Post()
  create(@Body() chargingStation: ChargingStation): Promise<ChargingStation> {
    return this.chargingStationService.create(chargingStation);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() chargingStation: ChargingStation): Promise<ChargingStation> {
    return this.chargingStationService.update(id, chargingStation);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ChargingStation> {
    return this.chargingStationService.delete(id);
  }
}