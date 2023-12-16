import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './columns.entity';
import { Users } from '../users/users.entity';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Columns, Users]), CardsModule],
  exports: [ColumnsService],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {
}
