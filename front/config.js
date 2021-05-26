import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const config = {
  auth: {
    LICHESS_CLIENT_ID: env.LICHESS_CLIENT_ID,
    LICHESS_CLIENT_SECRET: env.LICHESS_CLIENT_SECRET,
  },
};

export default config;
