import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
