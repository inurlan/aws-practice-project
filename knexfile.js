import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      user: process.env.SQL_USER_DEV,
      password: process.env.SQL_PASSWORD_DEV,
      database: process.env.SQL_DATABASE_DEV,
      port: +(process.env.SQL_PORT_DEV || 5432),
    },
    migrations: {
      extension: "js",
      directory: `${__dirname}/src/db/dev/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/dev/seeds`,
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        }
      : {
          user: process.env.SQL_USER_PROD,
          password: process.env.SQL_PASSWORD_PROD,
          database: process.env.SQL_DATABASE_PROD,
          port: +(process.env.SQL_PORT_PROD || 5432),
        },
    migrations: {
      extension: "js",
      directory: `${__dirname}/src/db/prod/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/prod/seeds`,
    },
  },
};

// If not Heroku env, set host as "localhost"
if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
  config.production.connection.host = "localhost";
}

export default config;
