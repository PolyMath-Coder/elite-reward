import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TaskEnum } from '../constants/enums';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskEnum, default: TaskEnum.PENDING })
  status: TaskEnum;
}
