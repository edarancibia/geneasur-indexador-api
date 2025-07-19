import { Module } from '@nestjs/common';
import { GravestonesService } from './gravestones.service';
import { GravestonesController } from './gravestones.controller';
import { Gravestone } from './gravestone.entity';
import { CementeriesModule } from '../cementeries/cementeries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from '../common/cloudinary.service';

@Module({
  imports: [
    CementeriesModule,
    TypeOrmModule.forFeature([Gravestone]),
  ],
  providers: [GravestonesService, CloudinaryService],
  controllers: [GravestonesController],
})
export class GravestonesModule {}
