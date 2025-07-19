import { Module } from '@nestjs/common';
import { CityService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
  controllers: [CitiesController]
})
export class CitiesModule { }
