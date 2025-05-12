import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserPasswordDto {
  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'Current user password',
  })
  currentPassword: string;

  @IsString()
  @Length(6, 12)
  @ApiProperty({
    example: '1234567890',
    description: 'New user password',
    minLength: 6,
    maxLength: 12,
  })
  newPassword: string;
}
