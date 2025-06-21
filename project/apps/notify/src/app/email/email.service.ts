import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { emailExceptions, emailText } from './constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const { host, port } = this.configService.get('application.smtp');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      ignoreTLS: true,
    });
  }

  async sendRegistrationEmail(to: string) {
    try {
      await this.transporter.sendMail({
        to,
        from: emailText.FROM_EMAIL,
        subject: emailText.SUCCESS_REGISTER,
        text: emailText.THANKS_FOR_REGISTER,
      });

      this.logger.log(emailText.SUCCESS_SENDING_MAIL);
    } catch (error) {
      this.logger.error(emailExceptions.ERROR_SENDING_MAIL, error);
    }
  }
}
