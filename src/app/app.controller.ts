import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Request
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/components/auth/auth.service";
import LoginDto from "src/dto/login.dto";

interface IToken {
  access_token: string;
}

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Body() params: LoginDto): Promise<IToken> {
    console.log("3--appController");
    return (await this.authService.login(params)) as IToken;
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("profile")
  getProfile(@Body() body: LoginDto): LoginDto {
    // token验证通过之后才会继续执行
    return body;
  }
}
