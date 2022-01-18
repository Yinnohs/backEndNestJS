import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import jwtAuthenticationGuard from 'src/authentication/passport/jwt/jwt.authentication.guard';
import { TaskCreateDto } from './dto/task-create.input';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';


@Resolver(()=> Task)
export class TaskResolver {

    constructor(private taskService:TaskService ) {}

    @Query(() => [Task], { name:"getAllTasks" })
    @UseGuards(jwtAuthenticationGuard)
    findAll():Promise<Task[]>{
        return this.taskService.getAllTasks();
    }

    @Query(()=> Task,{name:"getOneUser"})
    @UseGuards(jwtAuthenticationGuard)
    findOne(id:string):Promise<Task>{
        return this.taskService.getOneTask(id)
    }

    @Mutation(()=> Task, {name: "createTask"})
    create(@Args('taskInput') taskInput:TaskCreateDto):Promise<Task>{
        return this.taskService.createTask(taskInput);
    }

    @Mutation(()=> Task, {name:"softDeleteTask"})
    @UseGuards(jwtAuthenticationGuard)
    delete(@Args("id") id:string):Promise<Task>{
        return this.taskService.softDeleteTask(id);
    }

}
