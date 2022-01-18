import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { TaskModule } from 'src/task/task.module';

@Module({
    imports:[TypeOrmModule.forFeature([User]), TaskModule],
    providers:[UsersService, UsersResolver],
    controllers:[UsersController],
    exports:[UsersService],
})
export class UsersModule {}
