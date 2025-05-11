import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @IsString()
  @Length(3, 50)
  @ApiProperty({
    example: 'example_name',
    description: 'Username',
  })
  username: string;

  @IsString()
  @Length(6, 12)
  @ApiProperty({
    example: '1234567890',
    description: 'User password',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://google.com/avatar-21412412',
    description: 'User avatar',
  })
  avatar?: string;
}
