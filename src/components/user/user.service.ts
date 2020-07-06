import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";

import { User } from "src/entities/user.entity";

import Crypto from "src/utils";
const crypto = new Crypto();

/**
 * DTO 数据传输对象
 */
import CreateUserDto from "src/dto/create-user.dto";
import { PostException } from "src/exception";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    // return this.usersRepository.find();

    /**
     * 也可以使用getConnection()方法获取数据库连接
     */
    return getConnection().manager.find(User);
  }

  /**
   * 查找单个元素
   * @param params.password 加密后的密码
   * @param params.username 用户名
   */
  findOne(params: { username: string; password: string }): Promise<User> {
    // return this.usersRepository.findOne(id);
    params.password = crypto.decryptoStr(params.password);
    return this.usersRepository.findOne(params);
  }

  /**
   *
   * @param id
   */
  async findById(id: string | number): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (user) {
      throw new NotFoundException({
        errorcode: "000003",
        message: "没有找到该用户"
      });
    }

    return user;
  }

  /**
   * 查找到旧的用户信息，并且更新
   * @param createUserDto 要更新的数据
   */
  async updateOne(createUserDto: CreateUserDto): Promise<void> {
    let currentUser = await this.usersRepository.findOne(createUserDto.id);

    currentUser = currentUser && { ...currentUser, ...createUserDto };

    if (currentUser) {
      await this.usersRepository.save(currentUser);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  /**
   * 注册保存用户
   * @param createUserDto
   */
  async save(
    createUserDto: CreateUserDto
  ): Promise<{
    errorcode: string;
    message: string;
  }> {
    const user = await this.findOne(createUserDto);

    if (!!user) {
      throw new PostException({
        errorcode: "000005",
        message: "该用户名已被注册"
      });
    }

    await this.usersRepository.save(createUserDto);
    return {
      errorcode: "000000",
      message: "注册成功"
    };
  }
}
