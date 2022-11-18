import express from "express";
import session from "express-session";
import Redis from "ioredis"
import connectRedis from "connect-redis";

//* crear cliente redis 
const clientRedis = new Redis()

//* crear envoltorio redis 
const sessionRedis = connectRedis(session)

const app = express();



app.use(session({
    secret: '123456789',
    store: new sessionRedis({
        host:'127.0.0.1',
        port:6379,
        ttl:30,
        client:clientRedis
    }),
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