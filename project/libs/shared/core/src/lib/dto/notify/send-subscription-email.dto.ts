import { IsEmail, IsString } from 'class-validator';

export class SendSubscriptionEmailDto {
  @IsEmail()
  receiverEmail: string;

  @IsString()
  senderUsername: string;

  @IsString()
  postId: string;
}
