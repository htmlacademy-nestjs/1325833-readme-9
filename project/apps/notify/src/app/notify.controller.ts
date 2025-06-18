import { Controller, Get } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly appService: NotifyService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
