import express from "express";
import session from "express-session";
import FileStore from "session-file-store";

const app = express();

const fileStoreSession = FileStore(session);

app.use(session({
    secret: '123456789',
    store: new fileStoreSession({ path: './sessionsFS', ttl: 60, retries: 0 }),
    resave: false,
    saveUninitialized: false
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