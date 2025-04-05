import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto) {
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Le nom de la tâche est obligatoire');
    }

    const data: any = {
      name: dto.name.trim(),
    };

    if (dto.id !== undefined) {
      data.id = dto.id;
    }

    const savedTask = await this.taskRepository.save(data);
    return savedTask;
  }
}
