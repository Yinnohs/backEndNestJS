import { Field, InputType } from "@nestjs/graphql"
import { Hash } from "crypto"

@InputType()
export class userCreateDto{

    @Field()
    public username: string

    @Field()
    public password: string
}   