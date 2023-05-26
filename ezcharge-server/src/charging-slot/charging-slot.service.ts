import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChargingStation } from '../charging-station/schemas/charging-station.schema';
import { ChargingSlot } from './schemas/charging-slot.schema';
import { CreateChargingSlotDto } from './dto/create-charging-slot.dto';
import { UpdateChargingSlotDto } from './dto/update-charging-slot.dto';

@Injectable()
export class ChargingSlotService {
  constructor(
    @InjectModel(ChargingStation.name)
    private chargingStationModel: Model<ChargingStation>,
    @InjectModel(ChargingSlot.name)
    private chargingSlotModel: Model<ChargingSlot>,
  ) {}

  async findAllFromStation(chargingStationId: string): Promise<ChargingSlot[]> {
    const chargingStation = await this.chargingStationModel
      .findById(chargingStationId)
      .exec();

    if (!chargingStation) {
      throw new Error('Charging station not found');
    }

    return chargingStation.slots;
  }

  async findById(
    chargingStationId: string,
    slotId: string,
  ): Promise<ChargingSlot> {
    const chargingStation = await this.chargingStationModel
      .findById(chargingStationId)
      .exec();

    if (!chargingStation) {
      throw new Error('Charging station not found');
    }

    const slot = chargingStation.slots.find((s) => s._id.toString() === slotId);
    if (!slot) {
      throw new Error('Charging slot not found');
    }

    return slot;
  }

  async create(
    chargingStationId: string,
    chargingSlotDto: CreateChargingSlotDto,
  ): Promise<ChargingSlot> {
    const chargingStation = await this.chargingStationModel
      .findById(chargingStationId)
      .exec();

    if (!chargingStation) {
      throw new Error('Charging station not found');
    }

    const chargingSlot = new ChargingSlot(chargingSlotDto);
    chargingSlot.isOccupied = false;

    chargingStation.slots.push(chargingSlot);
    await chargingStation.save();
    return chargingSlot;
  }

  async update(
    chargingStationId: string,
    slotId: string,
    chargingSlotDto: UpdateChargingSlotDto,
  ): Promise<ChargingSlot> {
    const chargingStation = await this.chargingStationModel
      .findById(chargingStationId)
      .exec();

    if (!chargingStation) {
      throw new Error('Charging station not found');
    }

    const slotIndex = chargingStation.slots.findIndex(
      (s) => s._id.toString() === slotId,
    );
    if (slotIndex === -1) {
      throw new Error('Charging slot not found');
    }

    const chargingSlot = new ChargingSlot(chargingSlotDto);

    chargingStation.slots[slotIndex] = chargingSlot;
    await chargingStation.save();
    return chargingSlot;
  }

  async delete(
    chargingStationId: string,
    slotId: string,
  ): Promise<ChargingSlot> {
    const chargingStation = await this.chargingStationModel
      .findById(chargingStationId)
      .exec();

    if (!chargingStation) {
      throw new Error('Charging station not found');
    }

    const slotIndex = chargingStation.slots.findIndex(
      (s) => s._id.toString() === slotId,
    );
    if (slotIndex === -1) {
      throw new Error('Charging slot not found');
    }

    const deletedSlot = chargingStation.slots[slotIndex];
    chargingStation.slots.splice(slotIndex, 1);
    await chargingStation.save();
    return deletedSlot;
  }
}
