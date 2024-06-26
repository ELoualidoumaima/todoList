import { Field, Int, ObjectType } from "@nestjs/graphql";
import User from "./User";

@ObjectType()
export class Todolist {
  @Field(() => Int)
  id: number;

  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field()
  CreatedAt: Date;

  @Field()
  UpdatedAt: Date;

  @Field()
  Finished: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  Luser: User;
}
