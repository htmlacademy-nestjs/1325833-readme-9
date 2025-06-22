import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty({
    example: 'fwqijfwq-214124-fwqnfjwqnjkfwq-2421',
    description: 'User refresh token',
  })
  refreshToken: string;
}
