import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])
  ],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountriesModule {}
