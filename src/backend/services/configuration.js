const dotenvPromise = import('dotenv');
(await dotenvPromise).config();

const configuration = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    },
    server: {
        port: process.env.SERVER_PORT,
        cors: process.env.SERVER_CORS?.split(',')
    }
}

export default configuration;