import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_SECRET') || 'secret-jwt-key',
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '7d',
  },
});
