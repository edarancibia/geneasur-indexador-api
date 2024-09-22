import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gravestone, GravestoneDocument } from './gravestone.schema';
import { Model } from 'mongoose';
import { CreateGravestoneDto } from './dtos/createGravestone.dto';
import { Cemetery, CemeteryDocument } from '../cementeries/cemetery.schema';

@Injectable()
export class GravestonesService {
  constructor(
    @InjectModel(Gravestone.name)
    private gravestoneModel: Model<GravestoneDocument>,
    @InjectModel(Cemetery.name) private cemeteryModel: Model<CemeteryDocument>,
  ) {}

  async create(gravestone: CreateGravestoneDto): Promise<Gravestone> {
    const { name, lastname, cemetery, dateOfDeath } = gravestone;

    const newGravestone = new this.gravestoneModel({
      cemetery,
      name,
      lastname,
      dateOfDeath,
    });

    return await newGravestone.save();
  }

  async findGravestoneById(gravestoneId: string): Promise<Gravestone> {
    const result = await this.gravestoneModel.findOne({ id: gravestoneId });

    if (!result) {
      throw new HttpException('No matching results', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findGravestonesByCemeteryAndLastname(
    cemeteryId: string,
    lastname: string,
  ): Promise<Gravestone[]> {
    console.log(
      'Finding gravestones by cemeteryId:',
      cemeteryId,
      'and lastname:',
      lastname,
    );

    const cemetery = await this.cemeteryModel
      .findOne({ id: cemeteryId })
      .lean()
      .exec();

    if (!cemetery) {
      throw new NotFoundException(`Cemetery with ID ${cemeteryId} not found`);
    }

    const result = await this.gravestoneModel
      .find({
        cemetery: cemetery.id,
        lastname: lastname,
      })
      .exec();

    if (!result || result.length === 0) {
      throw new HttpException('No matching results', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
