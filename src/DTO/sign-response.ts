import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import User from "src/Entity/User";


@ObjectType()
export default class signResponse{
    @IsNotEmpty()
    @IsString()
    @Field()
    accesToken: string;

    @Field()
    refreshToken: string;

    @Field(() => User)
    user: User
}


