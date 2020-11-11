import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { User } from '../model/models';
import { BaseEntity, FindConditions, FindManyOptions, getRepository, Like, Repository } from 'typeorm';


export class SuperController<T> {

  protected service = getRepository<T>(this.model);

  constructor(private model: any) { }

  @Get('/getList/:startIndex/:pageSize/:sortBy/:sortDir')
  async getList(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('sortBy') sortBy, @Param('sortDir') sortDir) {

    // const opts: FindManyOptions<User> = {
    //   skip: startIndex,
    //   take: pageSize,
    //   order: { [sortBy]: sortDir.toUpperCase() as any },
    //   where: {},
    // }
    
    // const r = await this.service.findAndCount(opts);

    const r = await this.service.createQueryBuilder('p')
      .skip(startIndex)
      .take(pageSize)
      .orderBy(sortBy, sortDir.toUpperCase())
      .getManyAndCount()
      ;

    return { list: r[0], count: r[1] };
  }

  @Post('/post')
  async post(@Body() model: T) {
    (model as any).id = null;
    return await this.service.save(model);
  }

  @Put('/put/:id')
  async put(@Param('id') id: number, @Body() model: T) {
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
