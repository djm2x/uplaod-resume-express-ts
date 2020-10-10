import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { UserParcoursVisite } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/userParcoursVisites')
@UseBefore(JwtMiddleware)
export class UserParcoursVisitesController {

  private service = getRepository(UserParcoursVisite);

  @Post('/post')
  async post(@Body() model: UserParcoursVisite) {
    try {
      return await this.service.save(model);
    } catch (error) {
      return model;
    }
  }
}
