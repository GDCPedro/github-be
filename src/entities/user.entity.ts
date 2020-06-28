import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

/**
 * 实体是一个映射到数据库表（或使用 MongoDB 时的集合）的类。
 * 你可以通过定义一个新类来创建一个实体，并用@Entity()来标记：
 *
 * 基本实体由列和关系组成。
 * 每个实体必须有一个主列（如果使用 MongoDB，则为 ObjectId 列）。
 * 每个实体都必须在连接选项中注册：本项目是去appModule中注册。
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
