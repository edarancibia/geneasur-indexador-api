import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cemetery, CemeteryDocument } from './cemetery.schema';
import { Model } from 'mongoose';
import { CreateCemeteryDto } from './dtos/createCemetery.dto';

@Injectable()
export class CementeriesService {
  constructor(
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
  ) {}

  async getCemeteryByName(name: string) {
    return await this.cemeteryModel.findOne({ name: name }).populate('city');
  }

  async createCemetery(createCemeteryDto: CreateCemeteryDto): Promise<Cemetery> {
    const { name, cityId } = createCemeteryDto;
  
    const newCemetery = new this.cemeteryModel({
      name,
      city: cityId,
    });
  
    return newCemetery.save();
  }

  async findCemeteriesByCity(cityId: string): Promise<Cemetery[]> {
    return this.cemeteryModel.find({ city: cityId }).populate('city').exec();
  }

  async findAllCemeteries(): Promise<Cemetery[]> {
    return this.cemeteryModel.find().populate('city').exec();
  }
}
