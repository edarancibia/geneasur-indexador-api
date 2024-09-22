import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { CementeriesModule } from './cementeries/cementeries.module';
import { GravestonesModule } from './gravestones/gravestones.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CementeriesModule,
    GravestonesModule,
    CitiesModule,
    AuthModule,
    DatabaseModule,
    CountriesModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
