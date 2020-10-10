import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {

  use(request: any, response: any, next: (err?: any) => any): void {
    console.log('do something...');
    next();
  }

  // use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
  //   console.log("do something before execution...");
  //   return next().then(() => {
  //     console.log("do something after execution");
  //   }).catch(error => {
  //     console.log("error handling is also here");
  //   });
  // }

}
