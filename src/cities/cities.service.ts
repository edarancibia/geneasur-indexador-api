import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>) { }

  async create(name: string): Promise<City> {
    const cityDb = await this.cityRepo.findOne({ where: { name: name } });

    if (cityDb) {
      throw new HttpException('City already exists', HttpStatus.CONFLICT)
    }
    const newCity = this.cityRepo.create({ name });

    return await this.cityRepo.save(newCity);
  }

  async findById(id: string): Promise<City | undefined> {
    const city = await this.cityRepo.findOne({ where: { id: id } });

    return city;
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepo.find();
  }
}
