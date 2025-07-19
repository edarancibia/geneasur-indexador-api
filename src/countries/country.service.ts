import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country } from './country.entity';
import { CreateCountryDto } from './dtos/createCountry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
    constructor(
      @InjectRepository(Country)
      private readonly countryRepo: Repository<Country>,
      ) {}

      async getCountryByName(name: string): Promise<Country> {
        const countryDb = await this.countryRepo.findOne({ where: { name: name } });

        if(!countryDb) {
            throw new HttpException('Country does not exist', HttpStatus.NOT_FOUND)
        }

        return countryDb;
      }
    
      async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
        const { name } = createCountryDto;
      
        const newCountry = this.countryRepo.create({ name });
      
        return await this.countryRepo.save(newCountry);
      }
    
      async findAllCountries(): Promise<Country[]> {
        return this.countryRepo.find();
      }
}
