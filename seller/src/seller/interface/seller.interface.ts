import { ResponseDto } from "../../shared/dto/response.dto";

//import { ForgotPasswordDto, LoginMobileDto, LoginUserDto, UpdatePasswordDto, UserTokenDto, VerifyOtpDto } from "../dto/login-user.dto";
export const SELLER_SERVICE = 'SELLER_SERVICE';

export interface ISellerService {

   addCatalog(addCatalog: any): Promise<any>;
   listOrder(sellerId: number): Promise<any>;

   customResponse(data: any, message: string, status: string): Promise<ResponseDto>;
   

}