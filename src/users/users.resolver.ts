import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthenticationService } from 'src/authentication/authentication.service';
import jwtAuthenticationGuard from 'src/authentication/passport/jwt/jwt.authentication.guard';
import { SoftDeleteUserDto } from './dto/softDelete.user.dto';
import { userCreateDto } from './dto/users-create.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(()=> User)
export class UsersResolver {
    constructor(
        private userService: UsersService,
        ) {}


    @Query(()=> [User], {name:"getAllUsers"})
    //@UseGuards(jwtAuthenticationGuard)
    findAll(){
        return this.userService.findAllUsers();
        }
    
    @Query(()=> User, {name:"getOneUserById"})
    @UseGuards(jwtAuthenticationGuard)
    findOneById(@Args("id") id:string){
        return this.userService.findOneUser(id);
    }

    @Mutation(()=> User, {name:"softDeleteUser"})
    @UseGuards(jwtAuthenticationGuard)
    delete(@Args("userToSoftDelete") userToSoftDelete: SoftDeleteUserDto){
        return this.userService.softDeleteUser(userToSoftDelete.id);
    }

}
