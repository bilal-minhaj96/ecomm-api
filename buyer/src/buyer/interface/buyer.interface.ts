import { ResponseDto } from "../../shared/dto/response.dto";

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const BUYER_SERVICE = 'BUYER_SERVICE';

export interface IBuyerService {

   listSellers(): Promise<any>;
   sellerCatalog(sellerId:number): Promise<any>;
   createOrder(createOrder:any): Promise<any>;
   customResponse(data: object, message: string, status: string): Promise<ResponseDto>;
   

}