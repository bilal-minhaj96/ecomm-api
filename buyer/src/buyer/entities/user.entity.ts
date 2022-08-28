import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"user"})
export class User {
  @PrimaryGeneratedColumn({name:"user_id"})
  user_id: number;

  @Column({name:"username"})
  username: string;

  @Column({name:"password"})
  password: string;
  @Column({name:"full_name"})
  full_name: string;

  
}