import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyerController } from './buyer/buyer.controller';
import { SellerController } from './seller/seller.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.startegy';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    }),
    EasyconfigModule.register({
      path: `./environment/.env.${process.env.NODE_ENV}`,
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: new ConfigService().get('AUTH_SERVICE_HOST'),
          port: Number(new ConfigService().get('AUTH_SERVICE_PORT')),
        },
      },
      {
        name: 'BUYER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: new ConfigService().get('BUYER_SERVICE_HOST'),
          port: Number(new ConfigService().get('BUYER_SERVICE_PORT')),
        },
      },
      {
        name: 'SELLER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: new ConfigService().get('SELLER_SERVICE_HOST'),
          port: Number(new ConfigService().get('SELLER_SERVICE_PORT')),
        },
      }

    ]),

  ],
  controllers: [AppController, BuyerController, SellerController, AuthController],
  providers: [AppService,JwtStrategy],
  exports:[
    JwtStrategy,PassportModule
  ]
})
export class AppModule { }
