import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class taskUpdateTitleDto{
    @Field()
    public id: string;

    @Field()
    public title:string;
}