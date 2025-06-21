import { Controller, Inject, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT, HttpClientImpl, LikePostRdo } from '@project/core';
import { LikePostSwaggerDecorator } from '@project/swagger';

@Controller('like')
export class LikeController {
  blogServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.blogServiceUrl = this.configService.get<string>(
      'application.blogServiceUrl'
    );
  }

  @Post(':id')
  @LikePostSwaggerDecorator()
  async likePost(@Param('id') id: string): Promise<LikePostRdo> {
    return this.httpClient.post(`${this.blogServiceUrl}/blog/like/${id}`, null);
  }
}
