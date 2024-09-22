import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GravestonesService } from './gravestones.service';
import { CreateGravestoneDto } from './dtos/createGravestone.dto';
import { Gravestone } from './gravestone.schema';

@Controller('gravestones')
export class GravestonesController {
  constructor(private readonly gravestonesService: GravestonesService) {}

  @Post()
  async create(
    @Body() createGravestoneDto: CreateGravestoneDto,
  ): Promise<Gravestone> {
    return this.gravestonesService.create(createGravestoneDto);
  }

  @Get('/find/:id')
  async findById(@Param('id') id: string): Promise<Gravestone> {
    const gravestone = await this.gravestonesService.findGravestoneById(id);
    if (!gravestone) {
      throw new NotFoundException(`Gravestone with ID ${id} not found`);
    }
    return gravestone;
  }

  @Get('/search')
  async findByCemeteryAndLastname(
    @Query('cemeteryId') cemeteryId: string,
    @Query('lastname') lastname: string,
  ): Promise<Gravestone[]> {
    console.log('Invoking findByCemeteryAndLastname');
    const gravestones =
      await this.gravestonesService.findGravestonesByCemeteryAndLastname(
        cemeteryId,
        lastname,
      );

    if (gravestones.length === 0) {
      throw new NotFoundException(
        `No gravestones found for cemeteryId ${cemeteryId} and lastname ${lastname}`,
      );
    }
    return gravestones;
  }
}
