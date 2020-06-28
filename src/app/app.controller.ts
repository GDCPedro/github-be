import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { User } from "src/entities/user.entity";

@Controller()
export class AppController {
  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req: { user }): Promise<User> {
    console.log(req);
    return req.user;
  }
}
