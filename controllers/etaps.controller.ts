import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from 'routing-controllers';
import { Parcours, Etap } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/etaps')
// @UseBefore(JwtMiddleware)
export class EtapsController {

  private service = getRepository(Etap);

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:id')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize
    , @Param('sortBy') sortBy, @Param('sortDir') sortDir: string, @Param('id') id) {

    const opts: FindManyOptions = { 
      where: { parcoursId: id},
      skip: startIndex, 
      take: pageSize, 
      order: { [sortBy]: sortDir.toUpperCase() as any} 
    }

    // console.log(opts.order);

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
  async post(@Body() model: Etap) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: Etap) {
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
