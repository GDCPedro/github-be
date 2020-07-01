import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";

import { User } from "../../entities/user.entity";

/**
 * DTO 数据传输对象
 */
import CreateUserDto from "../../dto/create-user.dto";

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
   * @param params
   */
  findOne(params: { username: string; password: string }): Promise<User> {
    // return this.usersRepository.findOne(id);
    return this.usersRepository.findOne(params);
  }

  /**
   *
   * @param id
   */
  findById(id: string | number): Promise<User[]> {
    return this.usersRepository.find({
      where: { id }
    });
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
      throw new Error("没有该用户");
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(createUserDto: CreateUserDto): Promise<void> {
    console.log(createUserDto);
    console.log(await this.usersRepository.save(createUserDto));
  }
}
