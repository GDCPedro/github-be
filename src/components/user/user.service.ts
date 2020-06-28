import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    console.log(999);
    return this.usersRepository.find();
  }

  /**
   * 查找单个元素
   * @param id 查找的ID
   */
  findOne(id: string): Promise<User> {
    // return this.usersRepository.findOne(id);
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
