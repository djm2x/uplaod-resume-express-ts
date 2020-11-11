import { JsonController, Param, Get, Body, Post } from 'routing-controllers';
import { Discussion } from '../model/models';
import { SuperController } from './super.controller';

@JsonController('/discussions')
// @UseBefore(MyMiddleware)
export class DiscussionController extends SuperController<Discussion> {

  constructor() {
    super(Discussion);
  }

  @Get('/getContacts/:idUser')
  async getContacts(@Param('idUser') idUser: number) {

    const list = await this.service.createQueryBuilder('e')
      .where(`idUser = :idUser`, { idUser })
      .orWhere(`idOtherUser = :idUser`, { idUser })
      .orderBy('date', 'DESC')
      .innerJoin('e.sender', 'sender')
      .innerJoin('e.receiver', 'receiver')
      .getMany()
      ;

    return list;
  }
}
