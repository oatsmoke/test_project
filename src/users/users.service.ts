import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  async create(email: string, password: string) {
    const findUser = await this.findOneByEmail(email);
    if (findUser) {
      throw new BadRequestException();
    }
    const user = new Users();
    user.email = email;
    user.password = password;
    return this.usersRepository.save(user);
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
