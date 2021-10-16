import 'dotenv/config'

export default {
    type: process.env.DB_TYPE || "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "login_node",
    synchronize: process.env.DB_SYNCHRONIZE || false,
    logging: process.env.DB_LOGGING || true,
}

