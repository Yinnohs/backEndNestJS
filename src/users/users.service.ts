import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';
import { Repository } from 'typeorm';
import { UpdateUserNamedto } from './dto/update.username.user.dt.';
import { userCreateDto } from './dto/users-create.input';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>,
        private readonly taskService: TaskService
    ) {}

    async createUsers(userToCreate:userCreateDto): Promise<User>{
        const newUser = this.usersRepository.create(userToCreate);
        await this.usersRepository.save(newUser);
        newUser.password ="";
        return newUser;
    }

    async findAllUsers(): Promise<User[]>{
        return await this.usersRepository.find({ relations:['tasks'] })
    }

    async findOneUser(id:string):Promise<User>{
        let user = this.usersRepository.findOne({id}, { relations:["tasks"] });
        if (user){
            return user;
        }else{
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
        }
    }

    async findUserByUsername(username: string):Promise<User>{
        let user = this.usersRepository.findOne({username}, { relations: ["tasks"] });
        if(user) return user;
        else throw new HttpException("User with this Username does not exist", HttpStatus.NOT_FOUND);
        
    }

    async hardDeleteUser(id:string){
        let user = await this.usersRepository.findOne(id)
        let userTasks:Task[]= await this.taskService.getAllTasks();
        try{
            userTasks.forEach((task) => {
                if( task.userId === user.id){
                    this.taskService.hardDeleteTask(task.id)
                }
                this.usersRepository.remove(user)
                return "User deleted successfully";
            })
        }catch(error){
            throw new HttpException("the user does not exist", HttpStatus.BAD_REQUEST);
        }
        
    }

    async softDeleteUser(id:string):Promise<User>{
        let user = await this.usersRepository.findOne(id)
        let userTasks:Task[]= await this.taskService.getAllTasks();
        try{
            userTasks.forEach((task) => {
                if( task.userId === user.id){
                    this.taskService.softDeleteTask(task.id)
                }
                this.usersRepository.softDelete(user.id)
            })
            await this.usersRepository.softDelete(user.id)
            return  await this.usersRepository.findOne(user.id);
        }catch(error){
            throw new HttpException("The user does not exist", HttpStatus.BAD_REQUEST);
        }
    }

    async updateUserName(updateUsernameData: UpdateUserNamedto):Promise<User>{
        let user = await this.findOneUser(updateUsernameData.id)
        user.username = updateUsernameData.username;
        return this.usersRepository.save(user);
    }

    async updatePassword (newUser:User):Promise<User>{
        return await this.usersRepository.save(newUser)
    }
}
