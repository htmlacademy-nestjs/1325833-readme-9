import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AuthUser } from '../../types';

export class RefreshRdo implements AuthUser {
  @Expose()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhfMjE0MTJAbWFpbC5ydSIsInVzZXJuYW1lIjoiYWxleF8yMTQxMiIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI1LTA1LTE0VDEzOjAwOjQ4Ljk1OVoiLCJzdWJzY3JpYmVyc0NvdW50IjowLCJwb3N0c0NvdW50IjowLCJpZCI6Ijk5YjU3YjE1LWQ0ZTYtNDA4MC04MTdiLTFhNDQxMzVlYzRmNCIsImlhdCI6MTc0NzIyNzY0OCwiZXhwIjoxNzQ3ODMyNDQ4fQ.YWtna6oXbEl9-yT2JgqIW-BmHTUDv_4CrO1q796Lm4M',
    description: 'User access token',
  })
  accessToken: string;

  @Expose()
  @ApiProperty({
    example: '7d',
    description: 'Access token expires',
  })
  expiresIn: string;

  @Expose()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhfMjE0MTJAbWFpbC5ydSIsInVzZXJuYW1lIjoiYWxleF8yMTQxMiIsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI1LTA1LTE0VDEzOjAwOjQ4Ljk1OVoiLCJzdWJzY3JpYmVyc0NvdW50IjowLCJwb3N0c0NvdW50IjowLCJpZCI6Ijk5YjU3YjE1LWQ0ZTYtNDA4MC04MTdiLTFhNDQxMzVlYzRmNCIsImlhdCI6MTc0NzIyNzY0OCwiZXhwIjoxNzQ3ODMyNDQ4fQ.YWtna6oXbEl9-yT2JgqIW-BmHTUDv_4CrO1q796Lm4M',
    description: 'User refresh token',
  })
  refreshToken: string;
}
