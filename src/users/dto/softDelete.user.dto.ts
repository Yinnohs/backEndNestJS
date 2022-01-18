import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SoftDeleteUserDto{
    @Field()
    public id:string
}