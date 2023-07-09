import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ChargingStation } from '../charging-station/schemas/charging-station.schema';
import { Model } from 'mongoose';
import { ChargingSlot } from '../charging-slot/schemas/charging-slot.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(ChargingStation.name)
    private chargingStationModel: Model<ChargingStation>,
    @InjectModel(ChargingSlot.name)
    private chargingSlotModel: Model<ChargingSlot>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}
  async create(
    stationId: string,
    slotId: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const chargingStation = await this.chargingStationModel
      .findById(stationId)
      .exec();
    if (!chargingStation) {
      throw new NotFoundException('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    const reservation: Reservation = new this.reservationModel(createReservationDto);

    slot.reservations.push(reservation);
    await chargingStation.save();

    return reservation;
  }



  async findAll(stationId: string, slotId: string): Promise<Reservation[]> {
    const chargingStation = await this.chargingStationModel
      .findById(stationId)
      .exec();
    if (!chargingStation) {
      throw new NotFoundException('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    return slot.reservations;
  }

  async findOne(
    stationId: string,
    slotId: string,
    reservationId: string,
  ): Promise<Reservation> {
    const chargingStation = await this.chargingStationModel
      .findById(stationId)
      .exec();
    if (!chargingStation) {
      throw new NotFoundException('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    const reservation = slot.reservations.find((r) => r.id === reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async update(
    stationId: string,
    slotId: string,
    reservationId: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const chargingStation = await this.chargingStationModel
      .findById(stationId)
      .exec();
    if (!chargingStation) {
      throw new NotFoundException('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    const reservation = slot.reservations.find((r) => r.id === reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // Update reservation properties
    reservation.duration = updateReservationDto.duration;
    reservation.startTime = updateReservationDto.startTime;
    reservation.endTime = updateReservationDto.endTime;
    reservation.pricePerKw = updateReservationDto.pricePerKw;
    reservation.totalKW = updateReservationDto.totalKW;

    await chargingStation.save();

    return reservation;
  }

  async remove(
    stationId: string,
    slotId: string,
    reservationId: string,
  ): Promise<Reservation> {
    const chargingStation = await this.chargingStationModel
      .findById(stationId)
      .exec();
    if (!chargingStation) {
      throw new NotFoundException('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s.id === slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    const reservationIndex = slot.reservations.findIndex(
      (r) => r.id === reservationId,
    );
    if (reservationIndex === -1) {
      throw new NotFoundException('Reservation not found');
    }

    const deletedReservation = slot.reservations[reservationIndex];
    slot.reservations.splice(reservationIndex, 1);
    await chargingStation.save();
    return deletedReservation;
  }

  async findReservationByTransactionId(transactionId: string): Promise<any> {
    const station = await this.chargingStationModel.findOne({
      "slots.reservations.transactionId": transactionId
    }).lean().exec();

    if (!station || !station.slots) {
      throw new Error(`No reservation found with transaction id ${transactionId}`);
    }

    for (const slot of station.slots) {
      if (!slot.reservations) {
        console.error(`No reservations found for slot ${slot._id}`);
        continue;
      }

      for (const reservation of slot.reservations) {
        if (reservation.transactionId === transactionId.toString()) {
          return {
            user: reservation.user,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            duration: reservation.duration,
            totalPrice: reservation.totalPrice,
            transactionId: reservation.transactionId,
            paymentMethodId: reservation.paymentMethodId,
            totalKW: reservation.totalKW,
            pricePerKw: reservation.pricePerKw,
            station: {
              name: station.name,
              owner: station.owner,
              location: station.location,
              address: station.address,
              operationTime: station.operationTime,
              kwhCapacity: station.kwhCapacity,
              plugType: station.plugType,
              pricePerKw: station.pricePerKw,
            }
          };
        }
      }
    }

    throw new Error(`No reservation found with transaction id ${transactionId}`);
  }

}
