import Server from './classes/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

const server = new Server();

// Incia la conexion a la base de datos
createConnection();

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
var corsOptions = {
    origin: true, // "http://localhost:8081"
    credentials: true
};
server.app.use(cors(corsOptions));

// Inciar el servidor
server.start (() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`)
})
