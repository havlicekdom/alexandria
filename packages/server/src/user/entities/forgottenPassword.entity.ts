import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ForgottenPassword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;
}
