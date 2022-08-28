import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"product"})
export class Product {
  @PrimaryGeneratedColumn({name:"product_id"})
  product_id: number;
  @Column({name:"seller_id"})
  seller_id: number;
  @Column({name:"product_name"})
  product_name: string;
  @Column({name:"price"})
  price: number;
  @Column({name:"created_on"})
  created_on: Date;
  @Column({name:"created_by"})
  created_by: number;
  @Column({name:"is_active"})
  is_active: number;
  @Column({name:"updated_on"})
  updated_on: Date;
  @Column({name:"updated_by"})
  updated_by: number;

  
}