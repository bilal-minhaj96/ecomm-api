import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../shared/shared.module";
import { SELLER_SERVICE } from "./interface/seller.interface";
import { CustomConfigService } from "../shared/services/custom-config.service";
import { Product } from './entities/product.entity';
import { Seller } from './entities/seller.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [

    TypeOrmModule.forFeature([Product,Seller,Order,User]),
    SharedModule,
  

  ],
  providers: [
    { useClass: SellerService, provide: SELLER_SERVICE },
    SellerService,
   
  ],
  controllers: [SellerController],
  exports: [],
})
export class SellerModule {

}