import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './dto/task-create.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private TaskRepo: Repository<Task> ) {}

    async getAllTasks() : Promise<Task[]>{
        return this.TaskRepo.find();
    } 

    async getOneTask(id:string): Promise<Task>{
        let findTask = await this.TaskRepo.findOne(id);
        if(findTask) return findTask;
        else throw new HttpException("this Taks does not exist",HttpStatus.BAD_REQUEST);
    }

    async createTask(taskToCreate:TaskCreateDto):Promise<Task>{
        let newTask:Task = this.TaskRepo.create(taskToCreate);
        return this.TaskRepo.save(newTask);
    }

    async hardDeleteTask(id:string): Promise<string>{
        let task = await this.TaskRepo.findOne(id)
        try{
            await this.TaskRepo.remove(task);
            return "task deleted successfully"
        }catch(error)
        {
            throw new HttpException("something has ocurred", HttpStatus.BAD_REQUEST);
        }
        
    } 

    async softDeleteTask( id:string): Promise<Task>{
        try{
            await this.TaskRepo.softDelete(id)
            return await this.TaskRepo.findOne(id)
        }catch(error){
            throw new HttpException("An error has ocurred", HttpStatus.BAD_REQUEST);
        }
    }
}