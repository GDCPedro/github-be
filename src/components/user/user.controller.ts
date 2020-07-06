import { Controller, Get, Param, Body, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../../entities/user.entity";
import CreateUserDto from "../../dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import LoginDto from "src/dto/login.dto";
import { AuthService } from "../auth/auth.service";

interface IToken {
  access_token: string;
}

/**
 * 用户 控制器
 */
@Controller("user")
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  /**
   * 登录
   * @param params.username 用户名
   * @param params.password 加密后的密码
   *
   */
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() params: LoginDto): Promise<IToken> {
    console.log("3--appController");
    return (await this.authService.login(params)) as IToken;
  }

  /**
   * 获取用户信息详情
   * @param body 请求体 带参数
   */
  @UseGuards(AuthGuard("jwt"))
  @Post("profile")
  async getProfile(@Body() body: { username: string }): Promise<void> {
    // token验证通过之后才会继续执行
    // return await this.userService.findOne({
    //   username: body.username,
    //   password: body.password
    // });

    console.log("jwt succeed!" + body.username);
  }

  /* **********************以下代码还没有加入权限控制******************************** */

  @Get(":id")
  async findOne(
    @Param() params: { username: string; password: string }
  ): Promise<User> {
    return await this.userService.findOne(params);
  }

  @Get("findById/:id")
  async findById(@Param() param: { id: string }): Promise<User> {
    return await this.userService.findById(param.id);
  }

  /**
   * 注册用户
   * @param createUserDto
   */
  @Post("register")
  async saveUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<{
    errorcode: string;
    message: string;
  }> {
    return await this.userService.save(createUserDto);
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
