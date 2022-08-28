

import { Module } from '@nestjs/common';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../shared/shared.module";
import { BUYER_SERVICE } from "./interface/buyer.interface";
import { CustomConfigService } from "../shared/services/custom-config.service";
import { Product } from './entities/product.entity';
import { Order, } from './entities/order.entity';
import { Seller } from './entities/seller.entity';

@Module({
  imports: [

    TypeOrmModule.forFeature([Product,Seller,Order]),
    SharedModule,
  

  ],
  providers: [
    { useClass: BuyerService, provide: BUYER_SERVICE },
    BuyerService
   
  ],
  controllers: [BuyerController],
  exports: [],
})
export class BuyerModule {

}
