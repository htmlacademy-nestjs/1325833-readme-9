import 'multer';
import { type Express } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CommonPostRdo,
  CreateLinkPostDto,
  CreateLinkPostRdo,
  CreatePhotoPostDto,
  CreatePhotoPostRdo,
  CreateQuotePostDto,
  CreateQuotePostRdo,
  CreateTextPostDto,
  CreateTextPostRdo,
  CreateVideoPostDto,
  CreateVideoPostRdo,
  GetPostsDto,
  HTTP_CLIENT,
  HttpClientImpl,
  PostType,
  UploadedFileRdo,
} from '@project/core';
import {
  CreatePostSwaggerDecorator,
  MyDraftsSwaggerDecorator,
  PublishPostSwaggerDecorator,
  RepostPostSwaggerDecorator,
  DeletePostSwaggerDecorator,
  GetPostsSwaggerDecorator,
  SearchPostsSwaggerDecorator,
  GetPostByIdSwaggerDecorator,
} from '@project/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';

@Controller('post')
export class PostController {
  blogServiceUrl?: string;
  filesStorageServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.blogServiceUrl = this.configService.get<string>(
      'application.blogServiceUrl'
    );
    this.filesStorageServiceUrl = this.configService.get<string>(
      'application.filesStorageServiceUrl'
    );
  }

  @Post(PostType.VIDEO)
  @CreatePostSwaggerDecorator(PostType.VIDEO, CreateVideoPostRdo)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto
  ): Promise<CreateVideoPostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/${PostType.VIDEO}`,
      dto
    );
  }

  @Post(PostType.TEXT)
  @CreatePostSwaggerDecorator(PostType.TEXT, CreateTextPostRdo)
  async createTextPost(
    @Body() dto: CreateTextPostDto
  ): Promise<CreateTextPostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/${PostType.TEXT}`,
      dto
    );
  }

  @Post(PostType.QUOTE)
  @CreatePostSwaggerDecorator(PostType.QUOTE, CreateQuotePostRdo)
  async createQuotePost(
    @Body() dto: CreateQuotePostDto
  ): Promise<CreateQuotePostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/${PostType.QUOTE}`,
      dto
    );
  }

  @Post(PostType.PHOTO)
  @UseInterceptors(FileInterceptor('file'))
  @CreatePostSwaggerDecorator(PostType.PHOTO, CreatePhotoPostRdo)
  async createPhotoPost(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // 1MB
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<CreatePhotoPostRdo> {
    const form = new FormData();

    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const headers = form.getHeaders();
    const uploadFileResponse: UploadedFileRdo = await this.httpClient.post(
      `${this.filesStorageServiceUrl}/api/files/upload`,
      form,
      { headers }
    );

    const dto: Omit<CreatePhotoPostDto, 'status' | 'type'> = {
      photoUrl: `${this.filesStorageServiceUrl}${uploadFileResponse.path}`,
    };

    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/${PostType.PHOTO}`,
      dto
    );
  }

  @Post(PostType.LINK)
  @CreatePostSwaggerDecorator(PostType.LINK, CreateLinkPostRdo)
  async createLinkPost(
    @Body() dto: CreateLinkPostDto
  ): Promise<CreateLinkPostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/${PostType.LINK}`,
      dto
    );
  }

  @Get('my-drafts')
  @MyDraftsSwaggerDecorator()
  async getMyDrafts(): Promise<CommonPostRdo[]> {
    return this.httpClient.get(`${this.blogServiceUrl}/blog/my-drafts`);
  }

  @Post('publish/:id')
  @PublishPostSwaggerDecorator()
  async publishPost(@Param('id') id: string): Promise<CommonPostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/publish/${id}`,
      null
    );
  }

  @Post('repost/:id')
  @RepostPostSwaggerDecorator()
  async repostPost(@Param('id') id: string) {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/repost-post/${id}`,
      null
    );
  }

  @Delete(':id')
  @DeletePostSwaggerDecorator()
  async deletePost(@Param('id') id: string) {
    return this.httpClient.delete(`${this.blogServiceUrl}/blog/${id}`);
  }

  @Get()
  @GetPostsSwaggerDecorator()
  async getPosts(@Query() dto: GetPostsDto): Promise<CommonPostRdo[]> {
    return this.httpClient.get(`${this.blogServiceUrl}/blog`, { params: dto });
  }

  @Get('search')
  @SearchPostsSwaggerDecorator()
  async searchPosts(@Query('query') query: string): Promise<CommonPostRdo[]> {
    return this.httpClient.get(`${this.blogServiceUrl}/blog/search`, {
      params: { query },
    });
  }

  @Get(':id')
  @GetPostByIdSwaggerDecorator()
  async getPostById(@Param('id') id: string): Promise<CommonPostRdo> {
    return this.httpClient.get(`${this.blogServiceUrl}/blog/${id}`);
  }
}
