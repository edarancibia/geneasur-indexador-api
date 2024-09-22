import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const uri = configService.get<string>('DATABASE_URL');
            console.log('Connecting to database with URI:', uri);
            return {
              uri,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
})
export class DatabaseModule {}
