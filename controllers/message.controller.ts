import { JsonController, Param, Get, Body, Post } from 'routing-controllers';
import { Message } from '../model/models';
import { SuperController } from './super.controller';

@JsonController('/messages')
// @UseBefore(MyMiddleware)
export class MessageController extends SuperController<Message> {

  constructor() {
    super(Message);
  }

  @Post('/post')
  async post(@Body() model: Message) {
    (model as any).id = null;



    return await this.service.save(model);
  }

  @Get('/getMessages/:idDiscussion')
  async getMessages(@Param('idDiscussion') idDiscussion: number) {

    const list = await this.service.createQueryBuilder('e')
      .where(idDiscussion === 0 ? '1=1' : `idDiscussion = :idDiscussion`, { idDiscussion })
      .orderBy('date', 'DESC')
      .innerJoin('e.sender', 'sender')
      .innerJoin('e.receiver', 'receiver')
      .getMany()
      ;

    return list;
  }
}
