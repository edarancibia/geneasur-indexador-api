import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './cities.service';
import { City } from './city.schema';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly cityService: CityService
    ) {}

    @Post('')
    async createUser(@Body() city) {
        return this.cityService.create(city.name);
    }

    @Get('/all')
    async getUsers() {
        return this.cityService.findAll();
    }
}
