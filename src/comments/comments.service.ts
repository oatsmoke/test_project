import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from '../cards/cards.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
              @InjectRepository(Cards) private readonly cardsRepository: Repository<Cards>,
              @InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  async create(body: string, cardId: number, userId: number) {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new NotFoundException();
    }
    const comment = new Comments();
    comment.body = body;
    comment.cardId = card;
    comment.userId = await this.usersRepository.findOneBy({ id: userId });
    return this.commentsRepository.save(comment);
  }

  async findOne(commentId: number, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const comment = await this.commentsRepository.findOne({ where: { id: commentId, userId: user } });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async findAll(cardId: number, userId: number) {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card) {
      throw new NotFoundException();
    }
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    const comment = await this.commentsRepository.find({ where: { cardId: card, userId: user } });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async update(commentId: number, body: string) {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException();
    }
    return this.commentsRepository.save({ id: commentId, body });
  }

  async delete(commentId: number) {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException();
    }
    return this.commentsRepository.delete(commentId);
  }
}
