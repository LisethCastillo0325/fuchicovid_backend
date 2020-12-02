import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import Server from './classes/server';
import routes from "./routes";
const keys = require('../config/keys');
 
const server = new Server();

// Incia la conexion a la base de datos local
//createConnection();
// Inicia la conexion a la base de datos de heroku
createConnection(
    { 
        type: 'postgres', 
        url: keys.posgresqlURI, 
        ssl: {
            rejectUnauthorized: false
        },
        entities: ["dist/entities/*.js"]
    }
);
// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
var corsOptions = {
    origin: true, // "http://localhost:8081"
    credentials: true
};
server.app.use(cors(corsOptions));

// Rutas
server.app.use('/api/', routes);

// Inciar el servidor
server.start (() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`)
})
