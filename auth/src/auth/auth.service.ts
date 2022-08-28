import { Injectable, HttpStatus, HttpException, BadRequestException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { plainToClass } from "class-transformer";
import { IAuthService } from "../auth/interface/auth.interface";
import { CommonService } from "../shared/services/common.service";
import { ResponseDto } from "../shared/dto/response.dto";
import { JwtCustomService } from "../shared/services/jwt-custom.service";
import { User } from "./entities/user.entity";


@Injectable()
export class AuthService implements IAuthService {
    secret = 'JWT_SECRET';
    expiresIn = '30m';
    constructor(
        private jwtService: JwtService,

        private readonly commonService: CommonService,
        private readonly jwtCustomService: JwtCustomService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) {
        this.secret = 'JWT_SECRET';
        this.expiresIn = '30m';


    }


    async register(registerPayload: any): Promise<any> {


        let newUser = new User();
        newUser.username = registerPayload.userName;
        newUser.full_name = registerPayload.full_name;
        newUser.password = bcrypt.hashSync(registerPayload.password, 10)
        newUser.created_on = new Date();
        newUser.user_type_id = registerPayload.user_type_id;

        let userResp = await this.userRepository.save(newUser);
        if (!userResp) {
            throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return userResp;


    }


    async authenticate(loginUserDto: any): Promise<any> {

        const qb = this.userRepository.createQueryBuilder('Users');
        qb.select('Users.password', 'password');
        qb.addSelect('Users.user_type_id', 'user_type_id');
        qb.addSelect('Users.user_id', 'user_id');
        qb.where("Users.username = :userName", { userName: loginUserDto.userName });


        const user = await qb.getRawOne();

        //console.log("🚀 ~ file: auth.service.ts ~ line 101 ~ AuthService ~ authenticate ~ user", user)
        if (!user) {
            throw new HttpException({ message: "user_not_found" }, HttpStatus.NOT_FOUND);
        }

       // console.log(loginUserDto.password, user.password, 'oginUserDto.password, user.password')
        if (bcrypt.compareSync(loginUserDto.password, user.password)) {
            let data: any = {};
            data.id = user.user_id;
            data.user_type_id = user.user_type_id;
            let token = await this.generateJWT(data);
            data.token = token;
            return data;
        }
        throw new HttpException({ message: 'wrong_password' }, HttpStatus.UNAUTHORIZED);
    }
    async customResponse(data: object, message: string, status: string, userToken?: object): Promise<ResponseDto> {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        if (userToken) {
            dto.token = this.generateJWT(userToken);
        }
        return dto;
    }
    public generateJWT(data: any) {
        return this.jwtService.sign({ data }, {
            expiresIn: this.expiresIn,
            secret: this.secret
        });
    };


}