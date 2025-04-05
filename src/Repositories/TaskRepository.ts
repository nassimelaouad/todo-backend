import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async findById(id: number) {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async save(
    data: Prisma.TaskCreateInput | Prisma.TaskUpdateInput,
  ): Promise<Task> {
    if ('id' in data && data.id !== undefined) {
      // It's an update operation
      const taskId = Number(data.id); // Ensure id is a number

      return this.prisma.task.update({
        where: { id: taskId },
        data: data as Prisma.TaskUpdateInput, // Cast to TaskUpdateInput
      });
    } else {
      // It's a create operation
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput, // Cast to TaskCreateInput
      });
    }
  }
}
