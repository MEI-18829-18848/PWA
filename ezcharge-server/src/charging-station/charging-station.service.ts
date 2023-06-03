import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChargingStation } from './schemas/charging-station.schema';
import { CreateChargingStationDto } from './dto/create-charging-station.dto';
import { UpdateChargingStationDto } from './dto/update-charging-station.dto';

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

  async create(
    chargingStationDto: CreateChargingStationDto,
  ): Promise<ChargingStation> {
    const chargingStation = new ChargingStation(chargingStationDto);
    const createdStation = new this.chargingStationModel(chargingStation);
    return createdStation.save();
  }

  async update(
    id: string,
    chargingStation: UpdateChargingStationDto,
  ): Promise<ChargingStation> {
    return this.chargingStationModel
      .findByIdAndUpdate(id, chargingStation, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ChargingStation> {
    return this.chargingStationModel.findByIdAndRemove(id).exec();
  }
}