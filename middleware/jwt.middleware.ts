import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import Container from 'typedi';
import { JwtService } from '../services/jwt.service';

@Middleware({ type: 'before' })
export class JwtMiddleware implements ExpressMiddlewareInterface {

  private jwtService = Container.get(JwtService);

  use(request: any, response: any, next: (err?: any) => any): void {

    const token = request.headers['authorization'] as string;
    let jwtPayload;

    // Try to validate the token and get data
    try {

      jwtPayload = this.jwtService.verifyToken(token);
      response.locals.jwtPayload = jwtPayload;

    } catch (error) {
      // If token is not valid, respond with 401 (unauthorized)
      const html = `
      <div style="display: flex; justify-content: center; align-items: center;  height: 100%; width: 100vw; background-color: azure;">
        <h1>Hello brother : ${error.message}</h1>
      </div>
      `
      return response.status(401).send(html);
    }

    next();
  }
}
