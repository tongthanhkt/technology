import { GoogleOneTapStrategy as GG } from 'passport-google-one-tap';
import { Injectable } from '@nestjs/common';

import { AuthProviderEnum, PassportStrategyEnum } from '@reakestate/stateless';
import * as process from 'process';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOneTapStrategy extends PassportStrategy(
  GG,
  PassportStrategyEnum.GOOGLE_ONE_TAP,
) {
  constructor(private authService: AuthService) {
    super(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        verifyCsrfToken: false,
      },
      async (
        profile: {
          provider: string;
          id: string;
          displayName: string;
          username?: string | undefined;
          name?:
            | {
                familyName: string;
                givenName: string;
                middleName?: string | undefined;
              }
            | undefined;
          emails?:
            | Array<{
                value: string;
                type?: string | undefined;
              }>
            | undefined;
          photos?:
            | Array<{
                value: string;
              }>
            | undefined;
        },
        done: any,
      ) => {
        try {
          const response = await this.authService.authenticateOneTapGoogle(
            AuthProviderEnum.GOOGLE,
            profile,
          );

          done(null, {
            email: profile.emails[0].value,
            token: response.token,
            newUser: response.newUser,
          });
        } catch (err) {
          done(err, false);
        }
      },
    );
  }
}
