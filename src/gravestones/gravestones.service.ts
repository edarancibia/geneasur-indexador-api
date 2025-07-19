import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gravestone } from './gravestone.entity';
import { CreateGravestoneDto } from './dtos/createGravestone.dto';
import { Cemetery } from '../cementeries/cemetery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class GravestonesService {
  constructor(
    @InjectRepository(Gravestone)
    private gravestoneRepo: Repository<Gravestone>,
    @InjectRepository(Cemetery)
    private cemeteryRepo: Repository<Cemetery>,
  ) { }

  async create(gravestone: CreateGravestoneDto, secureUrl: string): Promise<Gravestone> {
    const { name, lastname, cemeteryId, dateOfDeath } = gravestone;

    const cemetery = await this.cemeteryRepo.findOne({ where: { id: cemeteryId } });

    const newGravestone = this.gravestoneRepo.create({
      cemetery,
      name,
      lastname,
      dateOfDeath,
    });

    newGravestone.url = secureUrl;

    return await this.gravestoneRepo.save(newGravestone);
  }

  async findGravestoneById(gravestoneId: string): Promise<Gravestone> {
    const result = await this.gravestoneRepo.findOne({ where: { id: gravestoneId } });

    if (!result) {
      throw new HttpException('No matching results', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findGravestonesByCemeteryAndLastname(
    cemeteryId: string,
    name: string,
    lastname: string,
  ): Promise<Gravestone[]> {
    const cemetery = await this.cemeteryRepo
      .findOne({ where: { id: cemeteryId } });

    if (!cemetery) {
      throw new NotFoundException(`Cemetery with ID ${cemeteryId} not found`);
    }

    const gravestones = await this.gravestoneRepo.find({
      where: [
        {
          cemetery: { id: cemeteryId },
          name: ILike(`%${name}%`),
        },
        {
          cemetery: { id: cemeteryId },
          lastname: ILike(`%${lastname}%`),
        },
      ],
    });

    if (!gravestones || gravestones.length === 0) {
      throw new HttpException('No matching results', HttpStatus.NOT_FOUND);
    }

    return gravestones;
  }
}
