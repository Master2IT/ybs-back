import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private usersService: UsersService) {
    super();
    this.usersService = usersService;
  }
  public async validate(email: string, phone): Promise<any> {
    const user = this.usersService.findUserByEmailOrPhone({ email, phone });

    // if (!user) {
    //   this.logger.debug(`User ${email} or ${phone} not found!`);
    //   throw new UnauthorizedException();
    // }
    //
    // if (password !== user.password) {
    //   this.logger.debug(`Invalid credentials for user ${username}`);
    //   throw new UnauthorizedException();
    // }

    return user;
  }
}
