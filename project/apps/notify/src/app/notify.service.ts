import { Injectable } from '@nestjs/common';

@Injectable()
export class NotifyService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
