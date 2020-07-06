import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/components/auth/auth.service";
import { User } from "src/entities/user.entity";
import LoginDto from "src/dto/login.dto";
import { UserService } from "src/components/user/user.service";

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
}
