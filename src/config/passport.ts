import { Request } from 'express';
import passport from 'passport';
import GithubStrategy from 'passport-github';
import 'dotenv/config';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, DOMAIN_NAME } = process.env;

const credentials = {
  clientID: GITHUB_CLIENT_ID as string,
  clientSecret: GITHUB_CLIENT_SECRET as string,
  scope: 'user:email',
  callbackURL: `${DOMAIN_NAME}/api/v1/auth/github/callback`,
};

const callbackFunction = (
  accessToken: string,
  refreshToken: string,
  profile: object,
  done: any,
): void => {
  done(null, profile);
};

passport.use(new GithubStrategy(credentials, callbackFunction));

passport.serializeUser((user: object, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: object, done: any) => {
  done(null, user);
});

export default passport;
