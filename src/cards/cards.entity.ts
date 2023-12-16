import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Columns } from '../columns/columns.entity';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  body: string;
  @ManyToOne(() => Columns, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  columnId: Columns;
  @ManyToOne(() => Users)
  userId: Users;
}
