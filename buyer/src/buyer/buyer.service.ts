



import { Injectable, HttpStatus, HttpException, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { IBuyerService } from "../buyer/interface/buyer.interface";
import { CommonService } from "../shared/services/common.service";
import { ResponseDto } from "../shared/dto/response.dto";
import { JwtCustomService } from "../shared/services/jwt-custom.service";
import { Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity";
import { Seller } from "./entities/seller.entity";
import { User } from "./entities/user.entity";


@Injectable()
export class BuyerService implements IBuyerService {
    secret = 'JWT_SECRET';
    expiresIn = '30m';
    constructor(

        private readonly commonService: CommonService,
        private readonly jwtCustomService: JwtCustomService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Seller)
        private readonly sellerRepository: Repository<Seller>,

    ) {
    }


    async listSellers(): Promise<any> {

        try {
            const qb = this.sellerRepository.createQueryBuilder('seller');
            qb.select('seller.seller_id', 'seller_id')
            qb.addSelect('seller.seller_name', 'seller_name')
            qb.addSelect('seller.created_on', 'registered_on')
            qb.where("seller.is_active = :is_active", { is_active: 1 });

            const sellers = await qb.getRawMany();

            if (!sellers) {
                throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return sellers;
        } catch (e) {
            console.log(e, 'error')
            throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }




    }


    async sellerCatalog(sellerId: number): Promise<any> {

        try {
            const qb = this.productRepository.createQueryBuilder('prd');
            qb.select('prd.product_id', 'product_id')
            qb.addSelect('prd.price', 'price')
            qb.addSelect('prd.created_on', 'created_on')
            qb.addSelect('prd.product_name', 'product_name')
            qb.where("prd.seller_id = :sellerId", { sellerId: sellerId });


            const products = await qb.getRawMany();

            if (!products) {
                throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return products;
        } catch (e) {
            console.log(e, 'error')
            throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }


    async createOrder(createOrder: any): Promise<any> {

        try {

            let order = new Order();
            order.product_id = createOrder.product_id;
            order.qty = createOrder.qty;
            order.is_active = 1;
            order.created_by = createOrder.loggedInUserId
            order.created_on = new Date();


            let orderResp = await this.orderRepository.save(order);

            if (!orderResp) {
                throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return orderResp;
        } catch (e) {
            console.log(e, 'error')
            throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }
    async customResponse(data: object, message: string, status: string, userToken?: object): Promise<ResponseDto> {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;

        return dto;
    }

}
