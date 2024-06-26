import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthRepo } from '../Repository/authRepo';
import { Auth } from '../auth/entities/auth.entity';
import { sigupInput } from '../DTO/signup-input';
import { UpdateAuthInput } from '../auth/dto/update-auth.input';
import signResponse from 'src/DTO/sign-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authRepository: AuthRepo) {}

  @Mutation(() => signResponse)
  signup(@Args('sigupInput') sigUpInput: sigupInput) {
    return this.authRepository.signup(sigUpInput);
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authRepository.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authRepository.findOne(id);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authRepository.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authRepository.remove(id);
  }
}
