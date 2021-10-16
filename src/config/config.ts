import 'dotenv/config'

export default {
    JWTSecret:  process.env.KEY || "MyKey",
    validationOpt:{"validationError":{"target":false,"value":false}},
    PORT: process.env.PORT || 3000
}