import * as dotenv from 'dotenv';

// dotenv.config({ path: `.env.local`, override: true });
dotenv.config();

const config = {
  SERVER: {
    PORT: process.env.SERVER_PORT,
  },
  SECRETS: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES,
  },
};

export default config;
