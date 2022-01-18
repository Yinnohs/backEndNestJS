import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/users.entity";
import { AuthenticationService } from "src/authentication/authentication.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authenticationService :AuthenticationService) {
        super({
            UsernameField: 'username',
            passwordField: 'password'
        });
    }

    async validate(user: string, password:string):Promise<User>{
        const getUser = this.authenticationService.getAuthenticatedUser(user, password)
        return getUser;
    }
}