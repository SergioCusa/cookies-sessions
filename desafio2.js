import express from "express";
import session from "express-session";

const app = express();

app.use(session({
    secret: "123456789"
}));


app.get("/", (req, res) => {

    if (req.session.contador) {
        req.session.contador++;
        res.send(`Hola ${req.session.usuario}! 
        Has accedido ${req.session.contador} veces`)
    } else {
        req.session.contador = 1;
        req.session.usuario = req.query.user;
        res.send(`Bienvenido ${req.session.usuario}`)
    }
});




app.listen(8081, () => {
    console.log("conectados!!")
})