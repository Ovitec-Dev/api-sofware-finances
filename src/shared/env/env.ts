import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  DOCS_ENDPOINT: '/docs',
  DIR_SWAGGER: process.env.DIR_SWAGGER,
  DB_CONNECTION: process.env.DB_CONNECTION || 'mariadb://finances_user_dev:a1B2c3D4e5F6g7H8i9J0kLmnOpQrStUvWxYz@db_dev:3306/finances_dev',
  DB_CONNECTION_MONGO: process.env.DB_CONNECTION_MONGO,
  SECURITY_API_URL: process.env.SECURITY_API_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PREFIX_URL: process.env.PREFIX_URL || '/api',
  MQ_SERVER_URL: process.env.MQ_SERVER_URL,
  DIR_ERRORS: process.env.DIR_ERRORS ,
  Oauth: {
    project_id: "login-finances",
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_OAUTH_REDIRECT_URIS],
    URL_OAUTH_ACCOUNTS: 'https://accounts.google.com/o/oauth2/auth',
    URL_Token: 'https://oauth2.googleapis.com/token',
    URL_SCOPE: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    URL_USER_INFO: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='
  }
};
