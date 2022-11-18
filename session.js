import express from "express";
const app = express();

import session from "express-session";

app.use(session({
    secret: "123456789",
}));

const auth = (req, res, next) => {
    if (req.session.isAdmin) {
        next()
    } else {
        res.status(401).send({ error: true })
    }
}


//----------------  ---------------------

app.get("/", (req, res) => {
    res.send({
        sessionID: req.sessionID,
        sessionStore: req.sessionStore
    })
});

app.get("/admin", auth, (req, res) => {
    res.send("Hola Admin")
});


app.get("/login", (req, res) => {
    const usuario = "sergio";
    const isAdmin = true;
    req.session.user = usuario;
    req.session.isAdmin = isAdmin;
    res.send("Inicio")
});


app.get('/session', (req, res) => {

    res.send({
        sessionId: req.sessionID,
        sessionStore: req.sessionStore
    })

});



app.get('/contador', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(req.session)
    } else {
        req.session.contador = 1;
        res.send("Hola")
    }

});

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.send("Fin")
});



app.listen(8080, () => {
    console.log("Connected")
});