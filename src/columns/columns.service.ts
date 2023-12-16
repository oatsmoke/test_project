import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Columns } from './columns.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class ColumnsService {
  constructor(@InjectRepository(Columns) private readonly columnsRepository: Repository<Columns>,
              @InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  async create(title: string, userId: number) {
    const column = new Columns();
    column.title = title;
    column.userId = await this.usersRepository.findOneBy({ id: userId });
    return this.columnsRepository.save(column);
  }

  async findOne(columnId: number, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const column = await this.columnsRepository.findOne({ where: { id: columnId, userId: user } });
    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  async findAll(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const column = await this.columnsRepository.findBy({ userId: user });
    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  async update(columnId: number, title: string) {
    const column = await this.columnsRepository.findOneBy({ id: columnId });
    if (!column) {
      throw new NotFoundException();
    }
    return this.columnsRepository.save({ id: columnId, title });
  }

  async delete(columnId: number) {
    const column = await this.columnsRepository.findOneBy({ id: columnId });
    if (!column) {
      throw new NotFoundException();
    }
    return this.columnsRepository.delete(columnId);
  }
}
