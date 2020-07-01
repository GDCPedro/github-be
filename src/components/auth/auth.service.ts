import { UserService } from "./../user/user.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { IUserBaseInfo } from "./types";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 验证登录用户名和密码
   * @param params { username, password }
   */
  async validateUser(params: IUserBaseInfo): Promise<User | false> {
    console.log("2--authService--validateUser");
    const user = await this.userService.findOne(params);
    // 用户名、密码匹配成功就返回user，否则false
    return user && user.password === params.password ? user : false;
  }

  /**
   * 返回JWT
   * 此时已经确认是查询出来成功的params
   * 要查询数据库获取id
   * @param params
   */
  async login(params: IUserBaseInfo): Promise<{ access_token: string } | void> {
    const user: User | false = await this.validateUser(params);
    if (user) {
      const payload = { username: user.username, id: user.id };

      return {
        access_token: this.jwtService.sign(payload)
      };
    }
  }
}
