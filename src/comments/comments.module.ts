import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from '../cards/cards.entity';
import { Users } from '../users/users.entity';
import { Comments } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Cards, Users])],
  exports: [CommentsService],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {
}
