import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { UserParcoursCree } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/userParcoursCrees')
@UseBefore(JwtMiddleware)
export class UserParcoursCreesController {

  private service = getRepository(UserParcoursCree);

  @Post('/post')
  async post(@Body() model: UserParcoursCree) {
    try {
      return await this.service.save(model);
    } catch (error) {
      return model;
    }
  }

}
