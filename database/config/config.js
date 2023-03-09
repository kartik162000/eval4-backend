module.exports = {
  "development": {
    "username":  "postgres",
    "password": null,
    "database": "eval-4 backend",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_BACKEND_USER,
    "password": process.env.DB_BACKEND_PASSWORD,
    "database": process.env.DB_BACKEND_NAME,
    "host": process.env.DB_BACKEND_HOST,
    "dialect": "postgres"
  },
  "docker": {
    "username": process.env.DB_BACKEND_USER,
    "password": "postgres",
    "database": process.env.DB_BACKEND_NAME,
    "host": process.env.DB_BACKEND_HOST,
    "dialect": "postgres"
  }
}
