import { ResponseDto } from "../../shared/dto/response.dto";

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {

    authenticate(loginDto: any): Promise<any>;
    register(registerPayload: any): Promise<any>;

   customResponse(data: object, message: string, status: string): Promise<ResponseDto>;
   

}