import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, LoggerService } from '@nestjs/common';
import { AUTH_SERVICE, IAuthService } from '../auth/interface/auth.interface';
import { MessagePattern } from '@nestjs/microservices';
import { CommonService } from '../shared/services/common.service';
import { ResponseDto } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';


@Controller('auth')
export class AuthController {

      constructor(
            @Inject(AUTH_SERVICE)
            private readonly iAuthService: IAuthService,
      ) { }

      @UsePipes(new ValidationPipe())
      @MessagePattern('authenticate')
      async authenticate(@Body() loginUserDto): Promise<any> {
          console.log(loginUserDto,'loginUserDto')
            const loginResponse = await this.iAuthService.authenticate(loginUserDto);
            return this.iAuthService.customResponse(loginResponse, "User Login successfully", HttpStatus.OK.toString());
      }

      @UsePipes(new ValidationPipe())
      @MessagePattern('register')
      async register(@Body() registerPayload): Promise<ResponseDto> {
            const result = await this.iAuthService.register(registerPayload);
            return this.iAuthService.customResponse(result,'created_successfully' , HttpStatus.OK.toString());
      }


}