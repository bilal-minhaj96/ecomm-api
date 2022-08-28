import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"seller"})
export class Seller {
  @PrimaryGeneratedColumn({name:"seller_id"})
  seller_id: number;

  @Column({name:"seller_name"})
  seller_name: string;

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