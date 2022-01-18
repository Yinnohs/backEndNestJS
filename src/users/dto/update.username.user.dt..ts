import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserNamedto{
    @Field()
    id:string

    @Field()
    username:string
}