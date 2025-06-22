import { CommonPostRdo } from './common-post.rdo';
import { GetUserFullInfoRdo } from '../account';
import { ApiProperty } from '@nestjs/swagger';

export class EnrichedPostRdo extends CommonPostRdo {
  @ApiProperty({ type: GetUserFullInfoRdo, description: 'Post author' })
  author: GetUserFullInfoRdo;
}
