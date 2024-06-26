import { Injectable } from '@nestjs/common';
import { sigupInput } from '../DTO/signup-input';
import { UpdateAuthInput } from '../auth/dto/update-auth.input';
import { PrismaService } from './prismaService';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'
@Injectable()
export class AuthRepo {
  constructor(
    private prisma:PrismaService,
    private jwtService:JwtService,
    private configService:ConfigService
  ){}
  async signup(sigupInput: sigupInput) {
    const hashpassword= await argon.hash(sigupInput.password);
    const user= await this.prisma.user.create({  
      data:{
        Nom:sigupInput.Nom,
        Prenom:sigupInput.Prenom,
        email:sigupInput.email,
        password:hashpassword
      }})
      const {accesToken,refreshToken}=await this.createTokens(
        user.id,
        user.email
      )
      await this.updateRefreshToken(
        user.id,
        refreshToken)
        return {accesToken,refreshToken,user}
     }

  sigin(signInInput:SignInInput) {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async createTokens(userId:number,email:string){
    const accesToken =this.jwtService.sign({
      userId,
      email,
    },{expiresIn:'10s',secret:this.configService.get('ACCES_TOKEN_SECRET')})
    const refreshToken =this.jwtService.sign({
      userId,
      email,
      accesToken,
    },{expiresIn:'7d',secret:this.configService.get('REFRESH_TOKEN_SECRET')})
    return {accesToken,refreshToken}
  }
  async updateRefreshToken(userId:number,refreshToken:string){
    const HashedRefreshToken= await argon.hash(refreshToken);
    await this.prisma.user.update({where:{id:userId},data:{hashReftoken:HashedRefreshToken}})
  }
}
