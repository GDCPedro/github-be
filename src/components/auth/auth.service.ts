import { IBaseResponse } from "./types.d";
import { UserService } from "./../user/user.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { IUserBaseInfo } from "./types";

interface ITokenResponse extends IBaseResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 验证登录用户名和密码
   * @param params { username, password }
   * @returns user | false 如果验证通过，就返回用户信息；否则返回false
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
  login(params: IUserBaseInfo): ITokenResponse {
    // 这个地方又验证了一步user，但是有必要吗？
    // const user: User | false = await this.validateUser(params);
    return {
      errorcode: "000000",
      message: "登录成功！",
      access_token: this.jwtService.sign(params)
    };
  }
}
