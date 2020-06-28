import { UserService } from "./../user/user.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * 验证登录用户名和密码
   * @param params { username, password }
   */
  async validateUser(params: {
    username: string;
    password: string;
  }): Promise<User | boolean> {
    const user = await this.userService.findOne(params.username);

    // 用户名、密码匹配成功就返回user，否则false
    return user && user.password === params.password ? user : false;
  }
}
