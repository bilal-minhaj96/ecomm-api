import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class AddCatalogDto {

  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}

export class ListOrdersDto {

    @ApiProperty()
    sellerId: number;
  }

  export class CreateProductDto {

    @ApiProperty()
    productName: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    sellerId: number;
  }