import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5444,
            username:"admin",
            password:"admin",
            database: "postgres",
            entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        }),
    ],
})
export class DatabaseModule {}