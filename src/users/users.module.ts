import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { ColumnsModule } from '../columns/columns.module';
import { CardsModule } from '../cards/cards.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), ColumnsModule, CardsModule, CommentsModule],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
}
