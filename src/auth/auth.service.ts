import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.userService.findOneWithUsername(username);
    if (!findUser) {
      throw new HttpException('User Not Found', 404);
    }
    if (password == findUser.password) {
      const { password, ...user } = findUser;
      return { accessToken: this.JwtService.sign(user) };
    }
  }
}
