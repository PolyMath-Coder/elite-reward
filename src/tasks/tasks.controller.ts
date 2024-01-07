import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRoute } from './constants/constants';

@Controller(TaskRoute.TASK)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Res() res) {
    const response = await this.tasksService.create(createTaskDto);
    res.status(response.responseCode).json(response);
  }

  @Get()
  async findAll(@Res() res) {
    const response = await this.tasksService.findAll();
    res.status(response.responseCode).json(response);
  }

  @Get(TaskRoute.SINGLE_TASK)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(TaskRoute.SINGLE_TASK)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res,
  ) {
    const response = await this.tasksService.update(id, updateTaskDto);
    res.status(response.responseCode).json(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
