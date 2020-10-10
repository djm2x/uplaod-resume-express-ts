import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { User } from '../model/models';
import { getRepository } from 'typeorm';

@JsonController('/users')
// @UseBefore(MyMiddleware)
export class UserController {

  private service = getRepository(User);

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('sortBy') sortBy, @Param('sortDir') sortDir) {

    const opts = { 
      skip: startIndex, 
      take: pageSize, 
      order: { [sortBy]: sortDir.toUpperCase() as any} 
    }

    return await this.service.findAndCount(opts);
  }


  // @Get()
  // async getAll() {
  //   return await this.service.get();
  // }

  @Post('/post')
  async post(@Body() model: User) {
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: User) {
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
