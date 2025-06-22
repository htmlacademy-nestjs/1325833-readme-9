import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserFullInfoRdo {
  @Expose()
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'User unique identifier',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'Oleg Petrov',
    description: 'Username',
  })
  username: string;

  @Expose()
  @ApiProperty({
    example: 'oleg_petrov@example.com',
    description: 'User Email',
  })
  email: string;
}
