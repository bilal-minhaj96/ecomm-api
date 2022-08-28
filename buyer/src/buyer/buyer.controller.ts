

import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, LoggerService, HttpException } from '@nestjs/common';
import { BUYER_SERVICE, IBuyerService } from '../buyer/interface/buyer.interface';
import { MessagePattern } from '@nestjs/microservices';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';


@Controller('buyer')
export class BuyerController {

      constructor(
            @Inject(BUYER_SERVICE)
            private readonly iBuyerService: IBuyerService,
      ) { }


      @UsePipes(new ValidationPipe())
      @MessagePattern('list_sellers')
      async listSellers(): Promise<any> {

            try {
                  const response = await this.iBuyerService.listSellers();
                  return this.iBuyerService.customResponse(response, "list", HttpStatus.OK.toString());
            } catch (error) {
                  throw new HttpException({ message: error }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

      }

      @UsePipes(new ValidationPipe())
      @MessagePattern('seller_catalog')
      async sellerCatalog(sellerId:number): Promise<any> {
        try {
          const response = await this.iBuyerService.sellerCatalog(sellerId);
          return this.iBuyerService.customResponse(response, "list", HttpStatus.OK.toString());
        } catch (error) {
          throw new HttpException({ message: error }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      @UsePipes(new ValidationPipe())
      @MessagePattern('create_order')
      async addCatalog(@Body() order): Promise<any> {
        try {
          const response = await this.iBuyerService.createOrder(order);
          return this.iBuyerService.customResponse(response, "order_created", HttpStatus.OK.toString());
        } catch (error) {
          throw new HttpException({ message: error }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}