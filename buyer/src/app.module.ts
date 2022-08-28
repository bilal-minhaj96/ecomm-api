import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyerModule } from './buyer/buyer.module';
import { DatabaseModule } from './config/database/database.module';
import { EasyconfigModule } from 'nestjs-easyconfig';

@Module({
  imports: [
    BuyerModule,
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
