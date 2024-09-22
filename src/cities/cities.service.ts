import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './city.schema';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

    async create(name: string): Promise<City> {
        const cityDb = await this.cityModel.findOne({ name: name });
  
        if(cityDb) {
          throw new HttpException('City already exists',HttpStatus.CONFLICT)
        }
        const newCity = new this.cityModel({ name });
  
        return newCity.save();
      }
    
      async findById(id: string): Promise<City | undefined> {
        const city = await this.cityModel.findById(id);
  
        return city;
      }

      async findAll(): Promise<City[]> {
        return await this.cityModel.find();
      }
}
