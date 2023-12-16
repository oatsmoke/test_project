import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Columns {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => Users)
  userId: Users;
}
