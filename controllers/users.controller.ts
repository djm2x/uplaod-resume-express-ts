import { JsonController, Param, Get } from 'routing-controllers';
import { User } from '../model/models';
import { SuperController } from './super.controller';

@JsonController('/users')
// @UseBefore(MyMiddleware)
export class UserController extends SuperController<User> {

  constructor() {
    super(User);
  }

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir/:name/:email/:role')
  async getAll(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('sortBy') sortBy, @Param('sortDir') sortDir, @Param('name') name, @Param('email') email, @Param('role') role) {

    const r = await this.service.createQueryBuilder('e')
      .where(name === '*' ? '1=1' : `name LIKE :name`, { name })
      .where(email === '*' ? '1=1' : `email LIKE :email`, { email })
      .where(role === '*' ? '1=1' : `role LIKE :role`, { role })
      .skip(startIndex)
      .take(pageSize)
      .orderBy(sortBy, sortDir.toUpperCase())
      .getManyAndCount()
      ;

    return { list: r[0], count: r[1] };
  }
}
