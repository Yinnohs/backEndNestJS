import { Controller, Get, HttpCode,Post, Req, Res, UseGuards} from '@nestjs/common';
import { Response, } from 'express';
import { AuthenticationService } from './authentication.service';
import jwtAuthenticationGuard from './passport/jwt/jwt.authentication.guard';
import { LocalStrategy } from './passport/local/local.strategy';
import RequestWithUser from './requestWithUser';


@Controller('user')
export class AuthenticationController {

    constructor(public readonly authenticationService: AuthenticationService) {}

    @HttpCode(200)
    @UseGuards(LocalStrategy)
    @Post("/log-in")
    async logIn(@Req() logInrequest: RequestWithUser, @Res() logInResponse: Response) {
        const user = logInrequest.body;
        const cookie = await this.authenticationService.getCookieWithJwtToken(user);
        logInResponse.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return logInResponse.send(user);
    }


    @UseGuards(jwtAuthenticationGuard)
    @Post("/log-out")
    async logOut(@Req() request:RequestWithUser, @Res() response:Response){
        response.setHeader("Set-Cookie",this.authenticationService.getCookieForLogOut() )
        response.sendStatus(200);
    }


    @UseGuards(jwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
