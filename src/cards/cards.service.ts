import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Columns } from '../columns/columns.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { Cards } from './cards.entity';

@Injectable()
export class CardsService {
  constructor(@InjectRepository(Cards) private readonly cardsRepository: Repository<Cards>,
              @InjectRepository(Columns) private readonly columnsRepository: Repository<Columns>,
              @InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  async create(title: string, body: string, columnId: number, userId: number) {
    const column = await this.columnsRepository.findOneBy({ id: columnId });
    if (!column) {
      throw new NotFoundException();
    }
    const card = new Cards();
    card.title = title;
    card.body = body;
    card.columnId = column;
    card.userId = await this.usersRepository.findOneBy({ id: userId });
    return this.cardsRepository.save(card);
  }

  async findOne(cardId: number, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const card = await this.cardsRepository.findOne({ where: { id: cardId, userId: user } });
    if (!card) {
      throw new NotFoundException();
    }
    return card;
  }

  async findAll(columnId: number, userId: number) {
    const column = await this.columnsRepository.findOneBy({ id: columnId });
    if (!column) {
      throw new NotFoundException();
    }
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const card = await this.cardsRepository.find({ where: { columnId: column, userId: user } });
    if (!card) {
      throw new NotFoundException();
    }
    return card;
  }

  async update(cardId: number, title: string, body: string) {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new NotFoundException();
    }
    return this.cardsRepository.save({ id: cardId, title, body });
  }

  async delete(cardId: number) {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new NotFoundException();
    }
    return this.cardsRepository.delete(cardId);
  }
}
