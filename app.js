const express = require("express");
const app = express();
const path = require("node:path");
const routerIndex = require("./routes/indexRoute");
const methodOverride = require('method-override');
const routerUsers = require("./routes/usersRoute");

app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

const PORT = 3030;

app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, "views"));


app.listen(PORT,()=> console.log(`Servidor corriendo en puerto ${PORT}`));


app.use('/', routerIndex);
app.use('/', routerUsers);

 