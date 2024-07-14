const express = require("express");
const app = express();
const path = require("node:path");
const router = require("./routes/indexRoute");

app.use(express.static("./public"));

const PORT = 3030;

app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`));

app.set('view engine', 'ejs');

app.use('/', router);

 