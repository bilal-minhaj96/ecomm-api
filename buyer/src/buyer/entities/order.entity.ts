import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"order"})
export class Order {
  @PrimaryGeneratedColumn({name:"order_id"})
  order_id: number;
  @Column({name:"product_id"})
  product_id: number;
  @Column({name:"qty"})
  qty: number;
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