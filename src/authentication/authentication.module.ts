import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { User } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './auntentication.controller';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './passport/jwt/jwt.strategy';
import { LocalAuthenticationGuard } from './passport/local/local.aunthentication.guard';
import { LocalStrategy } from './passport/local/local.strategy';

@Module({
    imports:[UsersModule, 
        TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule, 
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: async (configService: ConfigService)=>({
            secret: configService.get("JWT_SECRET"),
            signOptions:{
                expiresIn:`${configService.get("JWT_EXPIRES")}`
            }
        })
    })],
    controllers:[AuthenticationController],
    providers:[AuthenticationService,LocalStrategy,AuthenticationResolver,JwtStrategy],
})
export class AuthenticationModule {}
