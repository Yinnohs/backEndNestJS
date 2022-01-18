import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/auth-register.dto';
import  * as bcrypt from 'bcrypt';
import { PostgreErrorCode } from 'src/database/enums/postgreSQL.error.eun';
import { User } from 'src/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './passport/jwt/tokenPayload';
import { bufferCount } from 'rxjs';
import { LogInDto } from './dto/auth.login.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}


    public async register (registerData:RegisterDTO):Promise<User>{
        const hashedPassword :string = await bcrypt.hash(registerData.password, 10);
        try{
            const createUser = await this.usersService.createUsers({
                username: registerData.username,
                password: hashedPassword
            });
            createUser.password = "";
            return createUser;
        }catch(error){
            if(error?.code === PostgreErrorCode.UniqueViolation){
                throw new HttpException("Username Already Exist", HttpStatus.BAD_REQUEST );
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public async getAuthenticatedUser(username: string, plainTextPassword: string):Promise<User>{
        try{
            const user:User= await this.usersService.findUserByUsername(username);
            if(user){
                const loginUser: User = await this.usersService.findOneUser(user.id)
                await this.verifyPassword(plainTextPassword, loginUser.password);
                loginUser.password = undefined;
            return loginUser;
            }
            
        }catch(error){
            throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);
        }
    }

    public async updatePassword(username:string, plainTextPassword:string, newPlainTextPassword:string){
        let user :User =  await this.usersService.findUserByUsername(username);
        let newPassword = await bcrypt.hash(newPlainTextPassword,10)
        try{
            let check = await this.verifyPassword(plainTextPassword, user.password)
            user.password = newPassword;
            this.usersService.createUsers(user)

        }catch(error){
            throw new HttpException("something went wrong" ,HttpStatus.BAD_REQUEST);
        }
        
    }


    private async verifyPassword(plainTextPassword: string, hashedPassword :string){
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if(!isPasswordMatching){
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }


    public async getCookieWithJwtToken(userToCompare: LogInDto){
        const user:User = await  this.usersService.findUserByUsername(userToCompare.username)
        let check = await bcrypt.compare(userToCompare.password, user.password)
        if(check){
            const payload:TokenPayload = {userId: user.id};
        const token = this.jwtService.sign(payload);
        return`Authentication=${token}; HttpOnly; Path=/; Max-Age${this.configService.get("JWT_EXPIRES")}`;
        }else{
            throw new HttpException("Wrong credentials", HttpStatus.BAD_REQUEST);
        }
    }


    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    public async findUserByUsernameAuth(username: string, password: string){
        let user = await this.usersService.findUserByUsername(username)
        password = await bcrypt.hash(password, 10);
        if(user.password === password){
            return user;
        }else{
            throw new HttpException("this user does not exist", HttpStatus.BAD_REQUEST);
            
        }
    }
}
