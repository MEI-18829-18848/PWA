import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChargingStation } from './schemas/charging-station.schema';

@Injectable()
export class ChargingStationService {
  constructor(
    @InjectModel(ChargingStation.name)
    private chargingStationModel: Model<ChargingStation>,
  ) {}

  async findAll(): Promise<ChargingStation[]> {
    return this.chargingStationModel.find().exec();
  }

  async findById(id: string): Promise<ChargingStation> {
    return this.chargingStationModel.findById(id).exec();
  }

  async create(chargingStation: ChargingStation): Promise<ChargingStation> {
    const createdStation = new this.chargingStationModel(chargingStation);
    return createdStation.save();
  }

  async update(
    id: string,
    chargingStation: ChargingStation,
  ): Promise<ChargingStation> {
    return this.chargingStationModel
      .findByIdAndUpdate(id, chargingStation, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ChargingStation> {
    return this.chargingStationModel.findByIdAndRemove(id).exec();
  }
}
