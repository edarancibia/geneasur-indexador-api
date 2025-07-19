import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country])
  ],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountriesModule { }
