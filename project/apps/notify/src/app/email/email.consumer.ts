import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting, RABBIT_EXCHANGE, RABBIT_QUEUE } from '@project/core';

@Injectable()
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}

  @RabbitSubscribe({
    exchange: RABBIT_EXCHANGE,
    routingKey: RabbitRouting.Register,
    queue: RABBIT_QUEUE,
  })
  async handleUserRegistered(email: string) {
    if (email) {
      return this.emailService.sendRegistrationEmail(email);
    }
  }
}
