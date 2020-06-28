import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(params: {
    username: string;
    password: string;
  }): Promise<User | boolean> {
    const user = await this.authService.validateUser(params);

    if (!user) {
      // 验证失败
      throw new UnauthorizedException();
    }

    return user;
  }
}
