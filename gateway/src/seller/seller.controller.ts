import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { firstValueFrom } from 'rxjs';
import { ICreateResponse } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';

import { AddCatalogDto, CreateProductDto, ListOrdersDto } from './dto/seller.dto';

@ApiTags('seller')
@Controller('seller')
export class SellerController {

  constructor(
    @Inject('SELLER_SERVICE') private readonly sellerServiceClient: ClientProxy,

  ) { }

  @ApiBody({ type: CreateProductDto })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('create-catalog')

  public async addCatalog(@Body() createProductDto: CreateProductDto): Promise<any> {
    try {
      const res: ICreateResponse = await firstValueFrom(this.sellerServiceClient.send('add_catalog', createProductDto));
      if (Number(res.status) !== Number(HttpStatus.OK)) {
        throw new HttpException(res, res.status);
      }
      return res;
    } catch (e) {
      throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('list-orders/:sellerId')
  @ApiParam({name:'sellerId',type:'number'})
  public async listOrders(@Param('sellerId') sellerId: number): Promise<any> {
    try{
      const res: ICreateResponse = await firstValueFrom(this.sellerServiceClient.send('list_order', sellerId));
      if (Number(res.status) !== Number(HttpStatus.OK)) {
        throw new HttpException(res, res.status);
      }
      return res;
    }catch(e){
      throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }


}
