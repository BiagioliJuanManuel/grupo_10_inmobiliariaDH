const express = require("express");
const app = express();
const path = require("node:path");
const router = require("./routes/indexRoute");
const methodOverride = require('method-override');

app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

const PORT = 3030;

app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, "views"));


app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`));


app.use('/', router);

 