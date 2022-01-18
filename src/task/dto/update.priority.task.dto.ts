import { Field, InputType, Int } from "@nestjs/graphql";
import { TaskPriority } from "../entities/task.entity";

@InputType()
export class TaskUpdatePriorityDto{
    @Field()
    public id: string;
    @Field(()=> Int)
    public priority: TaskPriority;
}