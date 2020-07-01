import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";
import { UserService } from "src/components/user/user.service";
import { IJwtInfo } from "./types";
import { User } from "src/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromHeader("token"),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  /**
   *
   * @param payload Passport 首先验证 JWT 的签名并解码 JSON。
   * 然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递。
   * 此时项目的payload是包含username和sub
   */
  async validate(payload: IJwtInfo): Promise<User[]> {
    console.log("JwtStrategy--payload: " + JSON.stringify(payload));
    return await this.userService.findById(payload.id);
  }
}
