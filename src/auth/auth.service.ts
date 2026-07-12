import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(user: SignupDto) {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await this.usersService.create({
      username: user.username,
      password: hashedPassword,
    });

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginDto) {
    const validUser = await this.usersService.findOne(user.username);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(user.password, validUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validUser.username, sub: validUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
