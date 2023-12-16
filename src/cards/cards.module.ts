import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Cards } from './cards.entity';
import { Columns } from '../columns/columns.entity';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cards, Columns, Users]), CommentsModule],
  exports: [CardsService],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {
}
