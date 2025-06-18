import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRdo {
  @Expose()
  @ApiProperty({
    example: true,
    description: 'Operation status',
  })
  isSuccess: boolean;
}
