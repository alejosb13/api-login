import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import routes from "./routes"
// import 'dotenv/config'
import Config from "./config/config";

const PORT = Config.PORT

createConnection().then(async connection => {
    // console.log(connection);
    
    // create express app
    const app = express();
    // app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());

    // register express routes from defined application routes
    app.use("/api",routes)

    // setup express app here

    // start express server
    console.log(PORT);
    
    app.listen(PORT);
    console.log(`Open http://localhost:${PORT}/users to see results`);

}).catch(error => console.log(error));
