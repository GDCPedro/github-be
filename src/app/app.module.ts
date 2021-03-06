import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/**
 * 将TypeOrmModule导入AppModule
 * forRoot() 方法支持所有TypeORM包中createConnection()函数暴露出的配置属性。
 * 另外，我们可以创建 ormconfig.json ，而不是将配置对象传递给 forRoot()。
 *
 * ################################################################//#endregion
 * 存储库模式
 * TypeORM 支持存储库设计模式，因此每个实体都有自己的存储库。可以从数据库连接获得这些存储库。
 *
 * ############################//#endregion
 * 要使用多个连接，首先要做的是创建这些连接。在这种情况下，连接命名成为必填项。
 *
 * 使用["entities/*.entity.ts"]自动导入实体。
 */
import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "../entities/user.entity";
import { UserModule } from "../components/user/user.module";

import { AuthModule } from "src/components/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "guodongchao1994",
      database: "gdc-test",
      entities: ["entities/*.entity.ts"],
      synchronize: false,
      retryAttempts: 2,
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
