import { Field, InputType, Int } from "@nestjs/graphql"
import { User } from "src/users/entities/users.entity"
import { TaskPriority } from "../entities/task.entity"


@InputType()
export class TaskCreateDto{

    @Field()
    public title: string

    @Field( ()=> Int )
    public priority: TaskPriority

    @Field()
    public userId:string
}