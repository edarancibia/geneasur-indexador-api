import { Module } from '@nestjs/common';
import { CementeriesService } from './cementeries.service';
import { CementeriesController } from './cementeries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cemetery, CemeterySchema } from './cemetery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cemetery.name, schema: CemeterySchema }])
  ],
  providers: [CementeriesService],
  controllers: [CementeriesController],
  exports: [MongooseModule],
})
export class CementeriesModule {}
