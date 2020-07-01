import { Module } from "@nestjs/common";

/**
 * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库。
 */
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
