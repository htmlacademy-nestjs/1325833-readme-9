import { Expose } from 'class-transformer';

export class UploadedFileRdo {
  @Expose()
  id: string;

  @Expose()
  originalName: string;

  @Expose()
  path: string;

  @Expose()
  size: number;
}
