import { Controller, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    @Delete("/:id/delete")
    deleteUser():string{
        return"";
    }
}
