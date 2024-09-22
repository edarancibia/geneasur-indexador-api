import { Module } from '@nestjs/common';
import { GravestonesService } from './gravestones.service';
import { GravestonesController } from './gravestones.controller';
import { Gravestone, GravestoneSchema } from './gravestone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Cemetery, CemeterySchema } from 'src/cementeries/cemetery.schema';
import { CementeriesModule } from 'src/cementeries/cementeries.module';

@Module({
  imports: [
    CementeriesModule,
    MongooseModule.forFeature([
      { name: Gravestone.name, schema: GravestoneSchema },
    ]),
  ],
  providers: [GravestonesService],
  controllers: [GravestonesController],
})
export class GravestonesModule {}
