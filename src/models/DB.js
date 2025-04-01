import pg from "pg";
import { config } from "../../config.js";

const { Pool } = pg;

const {console_log, URL_CONNECTION} = config();

 const DBConnection = async () => {
  try {
    console_log('DB connected', URL_CONNECTION);
    return new Pool ({
      connectionString: URL_CONNECTION,
    })
  } catch (error) {
    console_log(error)
  }
};

const pool = await DBConnection();

export const executeQuery = async (query, params = []) => {
  try {
    const results = pool.query(query, params); ;
    return (await results);
  } catch (error) {
    console_log(error);
  }
};
