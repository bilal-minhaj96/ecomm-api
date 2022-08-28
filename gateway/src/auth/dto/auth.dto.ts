import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginUserDto {

  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}

export class RegisterDto {

    @ApiProperty()
    userName: string;
  
    @ApiProperty()
    password: string;
    @ApiProperty()
    full_name: string;
    @ApiProperty()
    user_type_id: number;
  }