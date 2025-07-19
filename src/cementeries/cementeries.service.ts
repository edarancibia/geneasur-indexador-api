import { Injectable } from '@nestjs/common';
import { Cemetery } from './cemetery.entity';
import { CreateCemeteryDto } from './dtos/createCemetery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../cities/city.entity';

@Injectable()
export class CementeriesService {
  constructor(
    @InjectRepository(Cemetery)
    private readonly cemeteryRepo: Repository<Cemetery>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  async getCemeteryByName(name: string) {
    return await this.cemeteryRepo.findOne({ where: { name: name} });
  }

  async createCemetery(createCemeteryDto: CreateCemeteryDto): Promise<Cemetery> {
    const { name, cityId } = createCemeteryDto;
    
    const city = await this.cityRepo.findOne({ where: { id: cityId } });
  
    const newCemetery = this.cemeteryRepo.create({name, city });
  
    return await this.cemeteryRepo.save(newCemetery);
  }

  async findCemeteriesByCity(cityId: string): Promise<Cemetery[]> {
    const city = await this.cityRepo.findOne({ where: { id: cityId } });

    return await this.cemeteryRepo.find({ where: { city: city } });
  }

  async findAllCemeteries(): Promise<Cemetery[]> {
    return this.cemeteryRepo.find({ relations: { city: true } });
  }
}
