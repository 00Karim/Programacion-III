const Server = require('./server.js');
const {connectDB} = require('./models/sqlite/config/db.js');
const {cargarDatos} = require('./models/sqlite/config/insertarDatosPrueba.js')


connectDB()
// cargarDatos()
const server = new Server();

server.listen();