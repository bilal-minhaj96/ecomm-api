import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {AuthGuard} from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ICreateResponse } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { CreateOrderDto } from './dto/buyer.dto';


@ApiTags('buyer')
@Controller('buyer')
export class BuyerController {

  constructor(
    @Inject('BUYER_SERVICE') private readonly buyerServiceClient: ClientProxy,
  ) { }


 
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('list-of-sellers')

  public async listSellers(): Promise<any> {

    try {
      const res: ICreateResponse = await firstValueFrom(this.buyerServiceClient.send('list_sellers', {}));
      if (Number(res.status) !== Number(HttpStatus.OK)) {
        throw new HttpException(res, res.status);
      }
      return res;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('seller-catalog/:sellerId')
  @ApiParam({name:'sellerId',type:'number'})
  public async sellerCatalog(@Param('sellerId') seller_id: number): Promise<any> {

    try {
      const res: ICreateResponse = await firstValueFrom(this.buyerServiceClient.send('seller_catalog', seller_id));
      if (Number(res.status) !== Number(HttpStatus.OK)) {
        throw new HttpException(res, res.status);
      }
      return res;
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBody({ type: CreateOrderDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UsePipes(new ValidationPipe())
  @Post('create-order')
  public async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {

    try {
      const res: ICreateResponse = await firstValueFrom(this.buyerServiceClient.send('create_order', createOrderDto));
      if (Number(res.status) !== Number(HttpStatus.OK)) {
        throw new HttpException(res, res.status);
      }
      return res;
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
