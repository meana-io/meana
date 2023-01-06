import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../../../libs/shared/Types/User';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: Pick<User, 'login' | 'password'>) {
    const userEntity = await this.usersService.findOneByLogin(user.login);

    if (userEntity) {
      const payload = { login: userEntity.login, sub: userEntity.uuid };
      const hash = await bcrypt.compare(user.password, userEntity.password);

      if (hash) {
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }

    throw new NotFoundException();
  }
}
