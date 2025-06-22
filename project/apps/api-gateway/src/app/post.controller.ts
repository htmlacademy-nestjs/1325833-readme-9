import 'multer';
import { type Express } from 'express';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
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
  CurrentUser,
  EnrichedPostRdo,
  GetPostsDto,
  GetUserFullInfoRdo,
  HTTP_CLIENT,
  HttpClientImpl,
  JwtAuthGuard,
  PostType,
  RABBIT_EXCHANGE,
  RabbitRouting,
  SendSubscriptionEmailDto,
  UploadedFileRdo,
  UserPostsCountUpdateType,
} from '@project/core';
import {
  CreatePostSwaggerDecorator,
  MyDraftsSwaggerDecorator,
  PublishPostSwaggerDecorator,
  RepostPostSwaggerDecorator,
  DeletePostSwaggerDecorator,
  SearchPostsSwaggerDecorator,
  GetPostByIdSwaggerDecorator,
  GetEnrichedPostsSwaggerDecorator,
} from '@project/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('post')
export class PostController {
  blogServiceUrl?: string;
  accountServiceUrl?: string;
  filesStorageServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly amqpConnection: AmqpConnection,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.blogServiceUrl = this.configService.get<string>(
      'application.blogServiceUrl'
    );
    this.accountServiceUrl = this.configService.get<string>(
      'application.accountServiceUrl'
    );
    this.filesStorageServiceUrl = this.configService.get<string>(
      'application.filesStorageServiceUrl'
    );
  }

  @Post(PostType.VIDEO)
  @UseGuards(JwtAuthGuard)
  @CreatePostSwaggerDecorator(PostType.VIDEO, CreateVideoPostRdo)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto,
    @CurrentUser('id') userId: string
  ): Promise<CreateVideoPostRdo> {
    const post = await this.httpClient.post<CreateVideoPostRdo>(
      `${this.blogServiceUrl}/blog/${PostType.VIDEO}`,
      dto
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.INCREMENT }
    );

    this.sendSubscriptionEmail(userId, post.id);

    return post;
  }

  @Post(PostType.TEXT)
  @CreatePostSwaggerDecorator(PostType.TEXT, CreateTextPostRdo)
  async createTextPost(
    @Body() dto: CreateTextPostDto
  ): Promise<CreateTextPostRdo> {
    const post = await this.httpClient.post<CreateTextPostRdo>(
      `${this.blogServiceUrl}/blog/${PostType.TEXT}`,
      dto
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.INCREMENT }
    );

    return post;
  }

  @Post(PostType.QUOTE)
  @CreatePostSwaggerDecorator(PostType.QUOTE, CreateQuotePostRdo)
  async createQuotePost(
    @Body() dto: CreateQuotePostDto
  ): Promise<CreateQuotePostRdo> {
    const post = await this.httpClient.post<CreateQuotePostRdo>(
      `${this.blogServiceUrl}/blog/${PostType.QUOTE}`,
      dto
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.INCREMENT }
    );

    return post;
  }

  @Post(PostType.PHOTO)
  @UseInterceptors(FileInterceptor('file'))
  @CreatePostSwaggerDecorator(PostType.PHOTO, CreatePhotoPostRdo)
  async createPhotoPost(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // 1MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
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

    const post = await this.httpClient.post<CreatePhotoPostRdo>(
      `${this.blogServiceUrl}/blog/${PostType.PHOTO}`,
      dto
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.INCREMENT }
    );

    return post;
  }

  @Post(PostType.LINK)
  @CreatePostSwaggerDecorator(PostType.LINK, CreateLinkPostRdo)
  async createLinkPost(
    @Body() dto: CreateLinkPostDto
  ): Promise<CreateLinkPostRdo> {
    const post = await this.httpClient.post<CreateLinkPostRdo>(
      `${this.blogServiceUrl}/blog/${PostType.LINK}`,
      dto
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.INCREMENT }
    );

    return post;
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
    const data = await this.httpClient.delete(
      `${this.blogServiceUrl}/blog/${id}`
    );

    await this.httpClient.post(
      `${this.accountServiceUrl}/account/update-posts-count`,
      { operation: UserPostsCountUpdateType.DECREMENT }
    );

    return data;
  }

  @Get()
  @GetEnrichedPostsSwaggerDecorator()
  async getPosts(@Query() dto: GetPostsDto): Promise<EnrichedPostRdo[]> {
    const posts: CommonPostRdo[] = await this.httpClient.get(
      `${this.blogServiceUrl}/blog`,
      { params: dto }
    );

    const enrichedPosts: EnrichedPostRdo[] = await Promise.all(
      posts.map(async (post) => {
        const { username, id, email }: GetUserFullInfoRdo =
          await this.httpClient.get(
            `${this.accountServiceUrl}/account/full-info/${post.authorId}`
          );

        return { ...post, author: { username, id, email } };
      })
    );

    return enrichedPosts;
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

  private async sendSubscriptionEmail(receiverId: string, postId: string) {
    const sender: GetUserFullInfoRdo = await this.httpClient.get(
      `${this.accountServiceUrl}/account/full-info/${receiverId}`
    );

    await Promise.all(
      sender.subscribers.map(async (subscriberId) => {
        const subscriber: GetUserFullInfoRdo = await this.httpClient.get(
          `${this.accountServiceUrl}/account/full-info/${subscriberId}`
        );

        const dto: SendSubscriptionEmailDto = {
          postId,
          receiverEmail: subscriber.email,
          senderUsername: sender.username,
        };

        await this.amqpConnection.publish(
          RABBIT_EXCHANGE,
          RabbitRouting.PublishNewPost,
          dto
        );
      })
    );
  }
}
