declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly NODE_ENV: 'test' | 'development' | 'production';
      readonly DOMAIN_NAME: string;
      readonly PORT?: string;
      readonly PWD: string;
      readonly DATABASE_URL: string;
      readonly DATABASE_URL_TEST: string;
      readonly JWT_SECRET: string;
      readonly SESSION_SECRET: string;
      readonly GITHUB_CLIENT_ID: string;
      readonly GITHUB_CLIENT_SECRET: string;
      readonly FRONTEND_URL: string;
    }
  }
}

export {};
