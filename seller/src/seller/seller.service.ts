



import { Injectable, HttpStatus, HttpException, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { ISellerService } from "../seller/interface/seller.interface";
import { CommonService } from "../shared/services/common.service";
import { ResponseDto } from "../shared/dto/response.dto";
import { JwtCustomService } from "../shared/services/jwt-custom.service";
import { Product } from "./entities/product.entity";
import { Order } from "./entities/order.entity";
import { User } from "./entities/user.entity";


@Injectable()
export class SellerService implements ISellerService {
    secret = 'JWT_SECRET';
    expiresIn = '30m';
    constructor(

        private readonly commonService: CommonService,
        private readonly jwtCustomService: JwtCustomService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) {
    }


    async addCatalog(addCatalog: any): Promise<any> {

        try {
            console.log(addCatalog, 'addCatalog')
            let product = new Product();
            product.product_name = addCatalog.productName;
            product.price = addCatalog.price;
            product.is_active = 1;
            product.created_on = new Date();
            product.seller_id = addCatalog.sellerId;

            let addCatalogResponse = await this.productRepository.save(product);

            if (!addCatalogResponse) {
                throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return addCatalogResponse;
        } catch (e) {
            console.log(e, 'error')
            throw new HttpException({ message: 'invalid data' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }

    async listOrder(sellerId: number): Promise<any> {

        try {
            const qb = this.orderRepository.createQueryBuilder('order');
            qb.select('order.product_id', 'product_id')
            qb.addSelect('order.qty', 'qty')
            qb.addSelect('prd.price', 'price')
            qb.addSelect('prd.created_on', 'ordered_on')
            qb.addSelect('order.created_by', 'customer_name')
            qb.addSelect('prd.product_name', 'product_name')
            qb.leftJoin(Product, 'prd', 'prd.product_id=order.product_id')
            qb.leftJoin(User, 'user', 'user.user_id=order.created_by')
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
    async customResponse(data: object, message: string, status: string, userToken?: object): Promise<ResponseDto> {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;

        return dto;
    }

}
