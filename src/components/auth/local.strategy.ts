import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/entities/user.entity";
import { IBaseResponse } from "./types";
import { PostException } from "src/exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * 登录时，验证用户名和密码是否匹配
   * @param username
   * @param password
   */
  async validate(
    username: string,
    password: string
  ): Promise<User | IBaseResponse> {
    console.log("1--local");
    const user = await this.authService.validateUser({
      username,
      password
    });
    if (!user) {
      // 验证失败
      throw new PostException({
        message: "用户名或密码错误",
        errorcode: "0000001"
      });
    }

    return user;
  }
}
