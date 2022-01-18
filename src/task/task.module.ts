import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Task])],
    providers: [TaskService, TaskResolver],
    controllers: [TaskController],
    exports:[TaskService]
})
export class TaskModule {}
