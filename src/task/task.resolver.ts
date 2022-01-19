import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import jwtAuthenticationGraphQlGuard from 'src/authentication/passport/jwt/jwt.authentication.graphql.guard ';
import jwtAuthenticationGuard from 'src/authentication/passport/jwt/jwt.authentication.guard';
import { TaskCreateDto } from './dto/task-create.input';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';


@Resolver(()=> Task)
export class TaskResolver {

    constructor(private taskService:TaskService ) {}

    @Query(() => [Task], { name:"getAllTasks" })
    @UseGuards(jwtAuthenticationGraphQlGuard)
    findAll():Promise<Task[]>{
        return this.taskService.getAllTasks();
    }

    @Query(()=> Task,{name:"getOneUser"})
    @UseGuards(jwtAuthenticationGraphQlGuard)
    findOne(id:string):Promise<Task>{
        return this.taskService.getOneTask(id)
    }

    @Mutation(()=> Task, {name: "createTask"})
    @UseGuards(jwtAuthenticationGraphQlGuard)
    create(@Args('taskInput') taskInput:TaskCreateDto):Promise<Task>{
        return this.taskService.createTask(taskInput);
    }

    @Mutation(()=> Task, {name:"softDeleteTask"})
    @UseGuards(jwtAuthenticationGraphQlGuard)
    delete(@Args("id") id:string):Promise<Task>{
        return this.taskService.softDeleteTask(id);
    }

}
