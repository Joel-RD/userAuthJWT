const { USER_DB, HOST_DB, DB, PASSWORD_DB, PORT_DB, CLOUD_DB, NODE_ENV, PORT_SERVER, SECRET_JWT_KEY } = process.env;

export const config = () => ({
  PORT: PORT_SERVER || 6352,
  SECRET_TOKEN: SECRET_JWT_KEY,
  URL_CONNECTION: NODE_ENV === 'production' ? CLOUD_DB : `postgres://${USER_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${DB}`,
  console_log: (...args) => {
    if (NODE_ENV !== "production") {
      console.log(...args);
    }
  },
});
