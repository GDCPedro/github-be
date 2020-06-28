import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async findOne(@Param() params: { id: string }): Promise<User> {
    console.log(await this.userService.findOne(params.id));
    return await this.userService.findOne(params.id);
  }

  @Get("all")
  async getAll(): Promise<User[]> {
    console.log("1");
    return await this.userService.findAll();
  }
}
