import { UseGuards } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { userCreateDto } from 'src/users/dto/users-create.input';
import { User } from 'src/users/entities/users.entity';


@Resolver(()=> User)
export class AuthenticationResolver {
    constructor(
        private authenticationService: AuthenticationService
        ) {}

    @Mutation(()=> User,{name: "register"} )
    async create(@Args('newUser') newUser:userCreateDto):Promise<User>{
        let createdUser = await this.authenticationService.register(newUser);
        return createdUser;
    }
}