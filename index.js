//inicializamos para usar las variables de entorno
require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');



//inicializar servidor
const app = express();

//subir archivos
app.use(fileUpload());

//configurar los cors
app.use(cors());


//lectura del body
app.use(express.json());


//rutas
app.use('/api', require('./routes/img.routes'));








//ejecutar servidor en puerto especifico
app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});