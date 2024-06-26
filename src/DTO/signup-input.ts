import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

@InputType()
export class sigupInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  Nom : string;

  @IsNotEmpty()
  @IsString()
  @Field()
  Prenom : string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email : string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password : string;
}
