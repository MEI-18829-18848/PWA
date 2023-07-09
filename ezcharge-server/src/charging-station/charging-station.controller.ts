import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus, UnauthorizedException, Headers
} from "@nestjs/common";
import { ChargingStationService } from './charging-station.service';
import { ChargingStation } from './schemas/charging-station.schema';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateChargingStationDto } from './dto/create-charging-station.dto';
import { UpdateChargingStationDto } from './dto/update-charging-station.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { AdminGuard } from '../auth/admin-guard/admin.guard';
import { UserGuard } from '../auth/user/user.guard';
import * as jwt from "jsonwebtoken";

interface JwtPayload {
  user_id: string;
}

@Controller('charging-stations')
@ApiTags('Charging Stations')
export class ChargingStationController {
  constructor(private chargingStationService: ChargingStationService) {}

  private getUserIdFromToken(token: string): string {
    try {
      const decoded = jwt.decode(token.split(' ')[1]) as JwtPayload;
      console.log(decoded)
      return decoded?.user_id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get('image/:id')
  downloadImage(@Param('id') id: string, @Res() response: Response) {
    this.chargingStationService.downloadImage(id).then((res) => {
      if (!res) {
        // Handle file not found case
        return response.status(HttpStatus.NOT_FOUND).send('File not found');
      }

      let extension: string;
      switch (res.mimeType) {
        case 'image/jpeg':
          extension = 'jpg';
          break;
        case 'image/png':
          extension = 'png';
          break;
        case 'image/svg+xml':
          extension = 'svg';
          break;
        case 'image/webp':
          extension = 'webp';
          break;
      }

      // Set the appropriate headers for file download
      response.setHeader('Content-Type', res.mimeType);
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="station-image.${extension}"`,
      );

      // Send the file content as the response
      return response.send(res.image);
    });
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    switch (file.mimetype) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg+xml':
      case 'image/webp':
        break;
      default:
        return res.status(415).send('Unsupported Media Type');
    }
    return res.status(200).send('Success');
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all charging stations' })
  findAll( @Headers('authorization') token: string): Promise<ChargingStation[]> {
    const userId = this.getUserIdFromToken(token);
    return this.chargingStationService.findAll(userId);
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
