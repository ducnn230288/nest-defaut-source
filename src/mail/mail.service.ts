import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { User } from '@modules/user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <no-reply@ari.com.vn>',
      subject: 'Welcome to Ari! We got a request to Reset Password',
      template: './confirmation',
      context: {
        name: user.name,
        url: process.env.DOMAIN_FE + 'auth/reset-password?token=' + token,
      },
    });
  }
}
