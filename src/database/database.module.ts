import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get<string>('NODE_ENV') === 'production';
        const url = configService.get<string>('DATABASE_URL');

        console.log('Connecting to database with URL:', url);

        return {
          type: 'postgres',
          url,
          autoLoadEntities: true,
          synchronize: !isProd, // desactívalo en producción
          logging: !isProd,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
