import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
