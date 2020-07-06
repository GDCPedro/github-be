import { LocalStrategy } from "./local.strategy";
import { Module, Global } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Global()
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "10s" }
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
