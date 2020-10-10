import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { Parcours, Reponse } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/reponses')
// @UseBefore(JwtMiddleware)
export class ReponsesController {

  private service = getRepository(Reponse);


  @Post('/post')
  async post(@Body() model: Reponse) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Reponse) {
    return await this.service.update(id, model);
  }

  @Get('/get/:id')
  async get(@Param('id') id: number) {
    return await this.service.findOne(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }

}
