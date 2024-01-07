import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../shared/entities/task.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from '../shared/success';
import { TaskEnum } from './constants/enums';
import { ErrorResponse } from 'src/shared/error';
import * as uuidValidate from 'uuid-validate';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskRepo.create(createTaskDto);
      task.status = TaskEnum.PENDING;

      const saved_task = await this.taskRepo.save(task);

      return SuccessResponse(
        201,
        'Task successfully created...',
        saved_task,
        null,
      );
    } catch (error) {
      return ErrorResponse(400, 'Unable to create task', null, null);
    }
  }

  async findAll() {
    const tasks = await this.taskRepo.find();

    if (tasks.length == 0) {
      return ErrorResponse(400, 'No task found', null, null);
    }
    return SuccessResponse(200, 'all tasks now retrieved...', tasks, null);
  }

  async findOne(taskId: any) {
    if (!uuidValidate(taskId)) {
      return ErrorResponse(400, 'Inputted Task ID not valid', null, null);
    }
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    console.log(task);
    if (!task) {
      return ErrorResponse(400, 'Oops! task not found...', null, null);
    }
    return SuccessResponse(200, 'task successfully retrieved', task, null);
    //`This action returns a #${id} task`;
  }

  async update(taskId: string, { title, description, status }: UpdateTaskDto) {
    if (!uuidValidate(taskId)) {
      return ErrorResponse(400, 'Inputted Task ID not valid', null, null);
    }
    const task = await this.taskRepo.findOne({ where: { id: taskId } });

    if (!task) {
      return ErrorResponse(400, 'task not found', null, null);
    }

    Object.assign(task, { title, description, status });
    await this.taskRepo.save(task);
    return SuccessResponse(200, 'task update successful', task, null);
    //return `This action updates a #${id} task`;
  }

  async remove(taskId: any) {
    if (!uuidValidate(taskId)) {
      return ErrorResponse(400, 'Inputted Task ID not valid', null, null);
    }
    await this.taskRepo.delete({ id: taskId });
    return SuccessResponse(
      200,
      `${taskId} task successfully deleted`,
      null,
      null,
    );
    //return `This action removes a #${id} task`;
  }
}
