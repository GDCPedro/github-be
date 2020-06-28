import { LocalStrategy } from "./local.strategy";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule, UserModule]
})
export class AuthModule {}
