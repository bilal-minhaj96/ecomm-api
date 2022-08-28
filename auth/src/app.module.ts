import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dirname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthService } from './auth/auth.service';
import { AUTH_SERVICE } from './auth/interface/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from './shared/services/common.service';
import { JwtCustomService } from './shared/services/jwt-custom.service';
import { User } from './auth/entities/user.entity';
require('dotenv').config();

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    }),
    EasyconfigModule.register({
      path: "./environment/.env.development"
    }),
    DatabaseModule,
   

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }