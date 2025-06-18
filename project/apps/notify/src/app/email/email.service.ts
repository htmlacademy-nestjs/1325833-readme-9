import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { EmailExceptions } from './constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('application.smtp.hostname');
    const port = this.configService.get<number>('application.smtp.port');

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
        from: 'noreply@example.com',
        subject: 'Регистрация успешна!',
        text: 'Спасибо за регистрацию!',
      });

      this.logger.log('Успешно отправлено!');
    } catch (error) {
      console.log(321, error);
      this.logger.error(EmailExceptions.ERROR_SENDING_MAIL);
    }
  }
}
