import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './country.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from './dtos/createCountry.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
      ) {}

      async getCountryByName(name: string): Promise<Country> {
        const countryDb = await this.countryModel.findOne({ name: name });

        if(!countryDb) {
            throw new HttpException('Country does not exist', HttpStatus.NOT_FOUND)
        }

        return countryDb;
      }
    
      async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
        const { name } = createCountryDto;
      
        const newCountry = new this.countryModel({ name });
      
        return newCountry.save();
      }
    
      async findAllCountries(): Promise<Country[]> {
        return this.countryModel.find();
      }
}
