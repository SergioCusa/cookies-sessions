import express from "express";
import cookieParser from "cookie-parser";

const expressApp = express();

                            //* llave privada para las cookies!
expressApp.use(cookieParser('ju2743dik33kwomdc7'));


expressApp.use((req, res, next) => {
    //*cookies normales
    console.log(req.cookies)
    //*cookies firmadas
    console.log(req.signedCookies)
    next();
});





expressApp.get("/", (req, res) => {
    res.send({
        logged: ("jwt" in req.cookies) ? true : false,
        cookies: req.cookies,
        signed: req.signedCookies
    })
});

expressApp.get("/cookie", (req, res) => {
    // *nombre cookie/contenido      /para firmar cookie
    res.cookie("jwt", "yyyyyyyyy", { signed: true })
    // *nombre cookie/contenido      /tiempo que dura la cookie en ms 
    res.cookie("normal", "contenido", { maxAge: 70000 })
    res.send("Set!")
});

expressApp.get("/logout", (req, res) => {
    res.clearCookie("jwt")
    res.send(req.cookies)
});



expressApp.listen(8080, () => {
    console.log("Conectado")
});