import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Todolist } from "./Todolist";

@ObjectType()
export default class User{
    @Field(() => Int)
    id : number;
    
    @Field()
    Nom : string;

    @Field()
    Prenom : string;

    @Field()
    email : string;

    @Field()
    password?: string;

    @Field({ nullable: true })
    hashReftoken?: string;

    @Field(() => [Todolist], { nullable: 'items' })
    todolistes: Todolist[];
}