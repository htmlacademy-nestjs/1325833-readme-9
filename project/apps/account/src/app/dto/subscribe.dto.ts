import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @IsString()
  @ApiProperty({
    example: 'd03dd390-0b2e-4a91-99ee-ef054c0d22c2',
    description: 'User unique id',
  })
  userId: string;
}
