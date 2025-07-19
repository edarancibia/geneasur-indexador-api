import { Module } from '@nestjs/common';
import { CementeriesService } from './cementeries.service';
import { CementeriesController } from './cementeries.controller';
import { Cemetery } from './cemetery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../cities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cemetery, City])
  ],
  providers: [CementeriesService],
  controllers: [CementeriesController],
  exports: [TypeOrmModule],
})
export class CementeriesModule { }
