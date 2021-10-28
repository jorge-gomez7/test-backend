
const { response } = require('express');
// librería axios para poder llamar los endpoint en el controller
const axios = require('axios');
//verificar base64
const base64Regex = require('base64-regex');








const sendGetRequest = async (req, res = response) => {
    try {

        newResponse = [];
        const resp = await axios.get(process.env.ENDPOINT, {
            headers: {
                'user': process.env.USER,
                'password': process.env.PASSWORD
            }
        });
        const info = await resp.data;

        info.map(data => {
            try {
                if (base64Regex({ exact: true }).test(data.base64)) {
                    newResponse.push(data);
                }
            } catch (error) {

            }
        });

        console.log(newResponse);
        res.json({
            ok: true,
            msg: 'Data obtenida',
            newResponse

        });

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};





const sendGetRequestOne = async (req, res = response) => {
    try {
        id = req.params.id;
        const resp = await axios.get(`${process.env.ENDPOINT}/${id}`, {
            headers: {
                'user': process.env.USER,
                'password': process.env.PASSWORD
            }
        });
        const info = await resp.data;
        console.log(info);

        res.json({
            ok: true,
            msg: 'Data obtenida',
            info
        });

    } catch (err) {
        // Handle Error Here
        console.error(err);
        res.json({
            ok: false,
            msg: "no hay imagen con el id proporcionado"
        })
    }
};




const sendPostRequest = async (req, res = response) => {

    try {
        const file = req.files.img;
        const fileName = file.name;
        // //validación que exista archivo para subir
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                msg: "No hay ningún archivo para subir."
            });
        }

        //separamos el string de la imagen por el punto 
        const nombreCortado = file.name.split('.');

        //guardamos el tipo de la extensión de la cadena que separamos arriba y le pedimos el -1 que es el ultimo
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        //validar extensión
        const extensionesValidas = ['png', 'jpg', 'jpeg']

        if (!extensionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: "La extensión del debe ser: png, jpg, jpeg"
            });
        }

        //Generar el archivo en base 64
        const base64Name = Buffer.from(file.data).toString('base64');

        //establecer la data para enviar
        const guardarImagen = {
            nombre: fileName,
            base64: base64Name
        }

        //usamos axios para enviar el post al endpoint con la data y los hedears 
        const resp = await axios.post(process.env.ENDPOINT, guardarImagen, {
            headers: {
                'user': process.env.USER,
                'password': process.env.PASSWORD
            }
        });

        res.json({
            ok: true,
            msg: "Se guardaron los siguientes parametros",
            fileName,
            base64Name
        });

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};





const sendPutRequest = async (req, res = response) => {
    try {

        const file = req.files.img;
        const fileName = file.name;
        const id = req.params.id;
        // //validación que exista archivo para subir
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                msg: "No hay ningún archivo para subir."
            });
        }

        //separamos el string de la imagen por el punto 
        const nombreCortado = file.name.split('.');

        //guardamos el tipo de la extensión de la cadena que separamos arriba y le pedimos el -1 que es el ultimo
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        //validar extensión
        const extensionesValidas = ['png', 'jpg', 'jpeg']

        if (!extensionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: "La extensión del debe ser: png, jpg, jpeg"
            });
        }

        //Generar el archivo en base 64
        const base64Name = Buffer.from(file.data).toString('base64');

        const actualizarImagen = {
            nombre: fileName,
            base64: base64Name
        }

        const resp = await axios.put(`${process.env.ENDPOINT}/${id}`, actualizarImagen, {
            headers: {
                'user': process.env.USER,
                'password': process.env.PASSWORD
            }
        });

        res.json({
            ok: true,
            msg: "¡Se actualizó la imagen exitosamente estableciendo los siguientes parametros!",
            fileName,
            base64Name
        });


    } catch (error) {
        console.log(error);
    }
};





const sendDeleteRequest = async (req, res = response) => {
    try {
        const id = req.params.id;

        const resp = await axios.delete(`${process.env.ENDPOINT}/${id}`, {
            headers: {
                'user': process.env.USER,
                'password': process.env.PASSWORD
            }
        });
        res.json({
            ok: true,
            msg: "se ha eliminado la imagen con el id",
            id
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sendGetRequest,
    sendPostRequest,
    sendPutRequest,
    sendGetRequestOne,
    sendDeleteRequest
}