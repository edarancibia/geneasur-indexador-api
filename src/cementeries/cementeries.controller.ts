import { Body, Controller, Get, Post } from '@nestjs/common';
import { CementeriesService } from './cementeries.service';
import { CreateCemeteryDto } from './dtos/createCemetery.dto';

@Controller('cemeteries')
export class CementeriesController {
    constructor(
        private readonly cemeteryService: CementeriesService
    ) {}

    @Post('')
    async create(@Body() cemetery: CreateCemeteryDto) {
        return await this.cemeteryService.createCemetery(cemetery);
    }

    @Get('/all')
    async getAll() {
        return await this.cemeteryService.findAllCemeteries();
    }

    @Get('/find-by-city')
    async getByCity(cityId: string) {
        return await this.cemeteryService.findCemeteriesByCity(cityId);
    }
}
