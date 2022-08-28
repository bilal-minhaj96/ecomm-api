import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";



export class CreateOrderDto {

    @ApiProperty()
    productId: number;
  
    @ApiProperty()
    qty: number;
    @ApiProperty()
    loggedInUserId: number;
  }