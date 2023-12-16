import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Cards } from '../cards/cards.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body: string;
  @ManyToOne(() => Cards, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  cardId: Cards;
  @ManyToOne(() => Users)
  userId: Users;
}
