import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('charging-stations')
@ApiTags('Reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/:station_id/slots/:slot_id/reservations')
  @ApiOperation({ summary: 'Create a reservation' })
  create(
    @Param('station_id') stationId: string,
    @Param('slot_id') slotId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.create(
      stationId,
      slotId,
      createReservationDto,
    );
  }

  @Get('/:station_id/slots/:slot_id/reservations')
  @ApiOperation({ summary: 'Get all reservations' })
  findAll(
    @Param('station_id') stationId: string,
    @Param('slot_id') slotId: string,
  ) {
    return this.reservationService.findAll(stationId, slotId);
  }

  @Get('/:station_id/slots/:slot_id/reservations/:reservation_id')
  @ApiOperation({ summary: 'Get a reservation by ID' })
  findOne(
    @Param('station_id') stationId: string,
    @Param('slot_id') slotId: string,
    @Param('reservation_id') reservationId: string,
  ) {
    return this.reservationService.findOne(stationId, slotId, reservationId);
  }

  @Patch('/:station_id/slots/:slot_id/reservations/:reservation_id')
  @ApiOperation({ summary: 'Update a reservation' })
  update(
    @Param('station_id') stationId: string,
    @Param('slot_id') slotId: string,
    @Param('reservation_id') reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(
      stationId,
      slotId,
      reservationId,
      updateReservationDto,
    );
  }

  @Delete('/:station_id/slots/:slot_id/reservations/:reservation_id')
  @ApiOperation({ summary: 'Delete a reservation' })
  remove(
    @Param('station_id') stationId: string,
    @Param('slot_id') slotId: string,
    @Param('reservation_id') reservationId: string,
  ) {
    return this.reservationService.remove(stationId, slotId, reservationId);
  }
}
