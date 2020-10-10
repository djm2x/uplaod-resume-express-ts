import { getRepository, Repository, ObjectType, ObjectLiteral, InsertResult } from 'typeorm';

export class SuperRepository<T> {

  readonly context: Repository<ObjectLiteral>;

  constructor(public entity: any) {
    this.context = getRepository(entity as any) as any;
  }

  addList(models: any[]) {
    return this.context.createQueryBuilder().insert().values(models).execute();
  }

  queryble() {
    return this.context;
  }

  add(model: T) {
    return this.context.insert(model);
  }

  count() {
    return this.context.count();
  }

  findAndCount(options) {
    return this.context.findAndCount(options);
  }

  findOneOrFail(options) {
    return this.context.findOneOrFail(options);
  }

  query(req) {
    return this.context.query(req);
  }

  get(options: any = { order: { id: -1 } }) {
    return this.context.find(options);
  }

  findById(id, options?) {
    return this.context.findOne(id, options);
  }

  update(id, model) {
    // const old = await this.context.findOneOrFail(id);
    return this.context.update(id, model);
  }

  delete(criteria) {
    return this.context.delete(criteria);
  }
}
