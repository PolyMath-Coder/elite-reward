import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TaskEnum } from '../../tasks/constants/enums';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskEnum;
}
