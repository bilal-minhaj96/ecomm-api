
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { DatabaseModule } from './config/database/database.module';
import { EasyconfigModule } from 'nestjs-easyconfig';

@Module({
  imports: [
    SellerModule,
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
