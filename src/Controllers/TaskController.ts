import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client'; 
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}
  // piour la récupération de toutes les tâches
  @Get('/tasks')
  async getAll() {
    const useCase = this.useCaseFactory.create(GetAllTasksUseCase);
    return useCase.handle();
  }
  // pour la création d'une tâche
  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    const useCase = this.useCaseFactory.create(SaveTaskUseCase);
    return useCase.handle(dto); 
  }

  // pour la mise à jour d'une tâche
  @Put('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    const useCase = this.useCaseFactory.create(SaveTaskUseCase);
    return useCase.handle({ ...dto, id: Number(id) });
  }

  // pour la suppression d'une tâche
  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    const useCase = this.useCaseFactory.create(DeleteTask);
    return useCase.handle(Number(id));
  }
}
