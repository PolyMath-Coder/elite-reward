import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, RetrieveAllTasksDto } from './dto/create-task.dto';
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
  async findAll(@Query() query: RetrieveAllTasksDto, @Res() res) {
    const response = await this.tasksService.findAll(query);
    res.status(response.responseCode).json(response);
  }

  @Get(TaskRoute.SINGLE_TASK)
  async findOne(@Param('id') id: string, @Res() res) {
    const response = await this.tasksService.findOne(id);
    res.status(response.responseCode).json(response);
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

  @Delete(TaskRoute.SINGLE_TASK)
  async remove(@Param('id') id: string, @Res() res) {
    const response = await this.tasksService.remove(id);
    res.status(response.responseCode).json(response);
  }
}
