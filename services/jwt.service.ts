
// import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../model/models';
import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
export class JwtService {

  constructor() { }

  createToken(user: User): string {
    const claims: Claims = { userId: user.id, username: user.lastname };
    const key: Secret = config.jwt.jwtSecret;
    const opt: SignOptions = { expiresIn: '1h' };

    return sign(claims, key, opt);
  }

  verifyToken(token: string): Claims {
    return verify(token, config.jwt.jwtSecret) as Claims;
  }
}

interface Claims {
  userId: number;
  username: string;
}