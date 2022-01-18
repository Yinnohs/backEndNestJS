import {IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LogInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(22)
    password: string;
}