/*
    Ruta: /api
*/

//requerimos el router de express
const { Router } = require('express');


//requerimos los controladores
const { sendGetRequest, sendPostRequest, sendPutRequest, sendGetRequestOne, sendDeleteRequest } = require('../controllers/img.controller');

//inicializamos el router para trabajar las rutas
const router = Router();




//obtener todas las imagenes
router.get('/', sendGetRequest);

//obtener imagen por id
router.get('/:id', sendGetRequestOne);

//guardar imagen
router.post('/', sendPostRequest);

//editar la imagen por id
router.put('/:id', sendPutRequest);

//eliminar imagen por id
router.delete('/:id', sendDeleteRequest);









module.exports = router;
