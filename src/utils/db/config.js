import knex from "knex";
import knexfile from "../../../knexfile.js";
import dotenv from "dotenv";

dotenv.config();

let config;

if (process.env.NODE_ENV === "production") {
  config = knexfile.production;
} else {
  config = knexfile.development;
}

const db = knex(config);

export { db };
export default knex(config);
