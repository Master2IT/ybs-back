import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.usersService = usersService;
  }

  private usersCode = [];

  async loginByPhone({ phone }) {
    const findUser = this.usersCode.findIndex((o) => o.phone == phone);
    if (findUser != -1) throw new RequestTimeoutException();

    const generateCode = Math.floor(Math.random() * 99999) + 10000;
    this.usersCode.push({
      code: generateCode,
      phone,
      email: '',
    });
    //   Send a sms to user phone;

    return {
      code: generateCode,
    };
  }

  async loginByEmail({ email }) {
    const findUser = this.usersCode.findIndex((o) => o.email == email);
    if (findUser != -1) throw new RequestTimeoutException();

    const user = await this.usersService.findUserByEmailOrPhone({
      email: email || null,
      phone: null,
    });

    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    const generateCode = Math.floor(Math.random() * 99999) + 10000;
    this.usersCode.push({
      code: generateCode,
      phone: '',
      email,
    });
    //   Send an email to user email;

    return {
      code: generateCode,
    };
  }
  async adminLogin({ email, password }) {
    const findUser = await this.usersService.findUserByEmailAndPassword({
      email,
      password,
    });
    if (!findUser) throw new NotFoundException('Email or Password is wrong!');

    return {
      id: findUser._id,
      token: this.jwtService.sign({
        email: findUser.email,
        sub: findUser._id,
      }),
    };
  }

  async checkCode(email = null, phone = null, code) {
    if (!code && (!email || !phone)) return;

    const findUser = this.usersCode.findIndex(
      (o) => (o.email == email || o.phone == phone) && o.code == code,
    );
    if (findUser == -1) throw new NotFoundException();

    const user = await this.usersService.findUserByEmailOrPhone({
      email: email || null,
      phone: phone || null,
    });

    if (!user) {
      throw new NotFoundException('User Not Found!');
    }

    this.usersCode.splice(findUser, 1);

    return {
      id: user._id,
      token: this.jwtService.sign({
        email: user.email,
        sub: user._id,
      }),
    };
  }
}
