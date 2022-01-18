import { Delete } from "@nestjs/common"
import { Field, ObjectType } from "@nestjs/graphql"
import { Task } from "src/task/entities/task.entity"
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class User{
    
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Field()
    @Column( {unique:true} )
    public username: string

    @Field()
    @Column()
    public password: string

    @Field({nullable:true})
    @DeleteDateColumn({nullable:true})
    public deletedAt: Date

    @OneToMany(()=> Task, task => task.user )
    @Field(()=> [Task], {nullable:true})
    public tasks: Task[];
}