import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import jwtAuthenticationGuard from 'src/authentication/passport/jwt/jwt.authentication.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly userService :UsersService){}
    @UseGuards(jwtAuthenticationGuard)
    @Delete("/:id/delete")
    async deleteUser(@Param("id") id:string){
        await this.userService.hardDeleteUser(id);
        return "User Delete succesfully";
    }
    @UseGuards(jwtAuthenticationGuard)
    @Get("/all")
    async findAll(){
        return await this.userService.findAllUsers();
    }

}
