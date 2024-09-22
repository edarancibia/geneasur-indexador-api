import { Module } from '@nestjs/common';
import { CityService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  providers: [CityService],
  controllers: [CitiesController]
})
export class CitiesModule {}
