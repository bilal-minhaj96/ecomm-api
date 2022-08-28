
import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, LoggerService, HttpException } from '@nestjs/common';
import { SELLER_SERVICE, ISellerService } from '../seller/interface/seller.interface';
import { MessagePattern } from '@nestjs/microservices';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';


@Controller('seller')
export class SellerController {

  constructor(
    @Inject(SELLER_SERVICE)
    private readonly iSellerService: ISellerService,
  ) { }

  @UsePipes(new ValidationPipe())
  @MessagePattern('add_catalog')
  async addCatalog(@Body() addCatalog): Promise<any> {
    try {
      const response = await this.iSellerService.addCatalog(addCatalog);
      return this.iSellerService.customResponse(response, "product_created", HttpStatus.OK.toString());
    } catch (error) {
      throw new HttpException({ message: error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern('list_order')
  async listOrder(sellerId:number): Promise<any> {
    try {
      const response = await this.iSellerService.listOrder(sellerId);
      return this.iSellerService.customResponse(response, "list", HttpStatus.OK.toString());
    } catch (error) {
      throw new HttpException({ message: error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  

  


}