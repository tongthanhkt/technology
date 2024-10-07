import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategyEnum } from '@reakestate/stateless';

@Injectable()
export class GoogleOneTapGuard extends AuthGuard(
  PassportStrategyEnum.GOOGLE_ONE_TAP,
) {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}
