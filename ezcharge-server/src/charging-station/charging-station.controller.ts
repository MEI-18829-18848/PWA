import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './schemas/charging-station.schema';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateChargingStationDto } from './dto/create-charging-station.dto';
import { UpdateChargingStationDto } from './dto/update-charging-station.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

@Controller('charging-stations')
@ApiTags('Charging Stations')
export class ChargingStationController {
  constructor(private chargingStationService: ChargingStationService) {}

  @Get('image/:id')
  async downloadImage(@Param('id') id: string, @Res() res: Response) {
    const file = await this.chargingStationService.retrieveImage(id);

    if (!file) {
      // Handle file not found case
      return res.status(HttpStatus.NOT_FOUND).send('File not found');
    }

    // Set the appropriate headers for file download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="station-image"`);

    // Send the file content as the response
    res.send(file);
  }

  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: String,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.chargingStationService.uploadImage(id, file.buffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all charging stations' })
  findAll(): Promise<ChargingStation[]> {
    return this.chargingStationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a charging station by ID' })
  @ApiParam({ name: 'id', description: 'Charging Station ID' })
  findById(@Param('id') id: String): Promise<ChargingStation> {
    return this.chargingStationService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new charging station' })
  @ApiBody({ type: CreateChargingStationDto })
  create(
    @Body() chargingStation: CreateChargingStationDto
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
