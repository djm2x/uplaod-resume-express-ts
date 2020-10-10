import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import {  Quizz } from '../model/models';
import { Response } from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/quizzs')
// @UseBefore(JwtMiddleware)
export class QuizzsController {

  private service = getRepository(Quizz);

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:id')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('sortBy') sortBy, @Param('sortDir') sortDir, @Param('id') id) {

    const opts: FindManyOptions = { 
      where: { etapId: id},
      skip: startIndex, 
      take: pageSize, 
      order: { [sortBy]: sortDir} }

    return await this.service.findAndCount(opts);
  }

  

  // @Get('/users/:id')
  // async getOne(@Param('id') id: number) {
  //   return await this.service.findById(id);
  // }

  // @Post("/users")
  // saveUser(@HeaderParam("authorization") token: string) {

  // }

  @Post('/post')
  async post(@Body() model: Quizz) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Quizz) {
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
