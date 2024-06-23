const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.static("./public"));

const PORT = 3030;

app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("views/home.html"));
 });

 app.get('/login', (req, res) => {
    res.sendFile(path.resolve("views/login.html"));
 });
 