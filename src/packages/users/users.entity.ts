// import { IsEmail } from 'class-validator';
import { hmacSha256 } from 'src/utils';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ default: '' })
  // @IsEmail()
  email: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    console.log(this.password);
    this.password = hmacSha256(this.password);
  }

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
