import express, { application } from "express";

import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json())



///* GET --> ver cookie
app.get('/cookies', (req, res) => {

    res.send({ result: true, ...req.cookies })

});

///* POST --> objeto cookie
app.post('/cookies', (req, res) => {
    const { nombre, valor, tiempo } = req.body
    res.cookie(nombre,
        valor,
        { maxAge: !tiempo ? undefined : 1000 * parseInt(tiempo) })
        res.send({ error: false, msg: `cookie ${nombre} con valor ${valor} creada`  })

});

///* DELETE --> eliminar  (nombre por param)
app.delete('/cookies/:nombre', (req, res) => {
    const { nombre } = req.params
    if (!nombre) return res.send({ error: true })
    res.clearCookie(nombre).send({ error: false, msg: `cookie ${nombre} eliminada`  })

});





app.listen(8080, () => {
    console.log("Connected!!")
});