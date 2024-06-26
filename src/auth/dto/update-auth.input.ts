import { sigupInput } from '../../DTO/signup-input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(sigupInput) {
  @Field(() => Int)
  id: number;
}
