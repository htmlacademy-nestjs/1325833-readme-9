import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
