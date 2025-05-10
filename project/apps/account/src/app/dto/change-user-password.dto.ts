import { IsString, Length } from 'class-validator';

export class ChangeUserPasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @Length(6, 12)
  newPassword: string;
}
