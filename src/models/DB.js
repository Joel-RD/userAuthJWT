import pg from "pg";

const { Pool } = pg;

const { USER_DB, HOST_DB, DB, PASSWORD_DB, PORT_DB, CLOUD_DB } = process.env;

 const DBConnection = async () => {
  try {
    console.log('DB connected');
    return new Pool ({
      connectionString: CLOUD_DB ? CLOUD_DB : `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DB}`,
    })
  } catch (error) {
    console.error(error)
  }
};

const pool = await DBConnection();

export const executeQuery = async (query, params = []) => {
  try {
    const results = pool.query(query, params); ;
    return (await results);
  } catch (error) {
    console.error(error);
  }
};
