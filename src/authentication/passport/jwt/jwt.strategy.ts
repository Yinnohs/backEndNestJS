import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from "express"
import TokenPayload from "./tokenPayload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configureService: ConfigService,
        private readonly userService: UsersService,
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromExtractors([(requestJWT: Request) => {
            return requestJWT?.cookies?.Authentication;
        }]),
        secretOrKey: configureService.get('JWT_SECRET')
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.findOneUser(payload.userId);
    }
}