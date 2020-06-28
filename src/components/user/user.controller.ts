import { Controller, Get, Param, Body, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../../entities/user.entity";
import CreateUserDto from "../../dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    console.log("1");
    return await this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param() params: { id: string }): Promise<User> {
    return await this.userService.findOne(params.id);
  }

  @Post("add")
  async saveUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.save(createUserDto);
  }

  @Post("updateOne")
  async updateUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.userService.updateOne(createUserDto);
    } catch (error) {
      console.error(error);
    }
  }
}
