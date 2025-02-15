import pg from "pg";

const { Pool } = pg;

const { USER_DB, HOST_DB, DB, PASSWORD_DB, PORT_DB, CLOUD_DB } = process.env;

 const DBConnection = async () => {
  try {
    console.log('DB connected');
    const url_conect = CLOUD_DB ? CLOUD_DB : `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DB}`
    return new Pool ({
      connectionString: url_conect,
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
