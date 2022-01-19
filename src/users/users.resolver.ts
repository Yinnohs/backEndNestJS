import { HttpCode, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import jwtAuthenticationGraphQlGuard from 'src/authentication/passport/jwt/jwt.authentication.graphql.guard ';
import jwtAuthenticationGuard from 'src/authentication/passport/jwt/jwt.authentication.guard';
import { SoftDeleteUserDto } from './dto/softDelete.user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(()=> User)
export class UsersResolver {
    constructor(
        private userService: UsersService,
        ){}

    @HttpCode(200)
    @UseGuards(jwtAuthenticationGraphQlGuard)
    @Query(()=> [User], {name:"getAllUsers"})
    async findAll(){
        return await this.userService.findAllUsers();
        }

    @HttpCode(200)
    @UseGuards(jwtAuthenticationGraphQlGuard)
    @Query(()=> User, {name:"getOneUserById"})
    async findOneById(@Args("id") id:string){
        return await this.userService.findOneUser(id);
    }

    @HttpCode(200)
    @Mutation(()=> User, {name:"softDeleteUser"})
    @UseGuards(jwtAuthenticationGraphQlGuard)
    async delete(@Args("userToSoftDelete") userToSoftDelete: SoftDeleteUserDto){
        return await this.userService.softDeleteUser(userToSoftDelete.id);
    }

}
