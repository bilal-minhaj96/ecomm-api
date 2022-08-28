import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ICreateResponse } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { LoginUserDto, RegisterDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
      ) {}
    
      @ApiBody({ type: LoginUserDto })
      @UsePipes(new ValidationPipe())
      @Post('login')
      
      public async authenticate(@Body() loginUserDto: LoginUserDto): Promise<any> {        
        const res: ICreateResponse = await firstValueFrom(this.authServiceClient.send('authenticate', loginUserDto));
        if (Number(res.status) !== Number(HttpStatus.OK)) {
          throw new HttpException(res, res.status);
        }
        return res;
      }
      @ApiBody({ type: RegisterDto })
      @UsePipes(new ValidationPipe())
      @Post('register')
      public async register(@Body() registerDto: RegisterDto): Promise<any> {        
        const res: ICreateResponse = await firstValueFrom(this.authServiceClient.send('register', registerDto));
        if (Number(res.status) !== Number(HttpStatus.OK)) {
          throw new HttpException(res, res.status);
        }
        return res;
      }
    
}
