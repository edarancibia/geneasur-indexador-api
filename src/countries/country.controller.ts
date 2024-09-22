import { Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dtos/createCountry.dto';

@Controller('countries')
export class CountryController {
    constructor(
        private readonly countryService: CountryService,
    ) {}

    @Post('')
    async create(country: CreateCountryDto) {
        return await this.countryService.createCountry(country);
    }

    @Get('')
    async getAll() {
       return await this.countryService.findAllCountries(); 
    }

    @Get('/:name')
    async getByName(@Param() countryName: string) {
       return await this.countryService.getCountryByName(countryName); 
    }
}
