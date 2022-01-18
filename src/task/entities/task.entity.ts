import { Field, Int, ObjectType } from "@nestjs/graphql"
import { User } from "src/users/entities/users.entity"
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class Task{
    
    @Field()
    @PrimaryGeneratedColumn("uuid")
    public id:string //identificador del registro

    @Field()
    @Column()
    public title: string//título de la tarea

    @Field( ()=> Int )
    @Column()
    public priority: TaskPriority //prioridad de la tarea

    @Field({nullable: true})
    @DeleteDateColumn({nullable:true})
    public deletedAt:Date

    @ManyToOne(()=> User,user=> user.tasks)
    @Field(()=> User)
    public user:User

    @Field()
    @Column()
    public userId: string
}

export enum TaskPriority{
    'LOW' = 1,
    'MEDIUM'= 2,
    'HIGH' = 3,
    'URGENT' = 4,
}