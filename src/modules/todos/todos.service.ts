import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dtos';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto) {
    const todo = this?.todoRepository.create(dto);

    return await this.todoRepository.save(todo);
  }

  async getAll() {
    return await this.todoRepository.find();
  }

  async getById(id: number) {
    return await this.todoRepository.find({ where: { id } });
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    //! Check that record exists

    Object.assign(todo, dto);

    await this.todoRepository.save(todo);
  }
}
