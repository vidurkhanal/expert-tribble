import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdDate = Date;

  @UpdateDateColumn()
  updatedDate = Date;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password: string;
}
