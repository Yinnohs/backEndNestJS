import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path/posix';
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    TaskModule,
    DatabaseModule, 
    UsersModule, 
    AuthenticationModule,
    GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), "src/graphql-schema.gql",)
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_EXPIRES: Joi.string().required(),
        JWT_SECRET: Joi.string().required()
      })
    })
  ]
  ,
  controllers: [],
  providers: [],
})
export class AppModule {}
