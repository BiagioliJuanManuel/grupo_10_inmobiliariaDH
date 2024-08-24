const express = require("express");
const app = express();
const path = require("node:path");
const routerIndex = require("./routes/indexRoute");
const methodOverride = require('method-override');
const routerUsers = require("./routes/usersRoute");
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret:"Nuestra frase secreta, shh!", 
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());

const PORT = 3030;

app.set('view engine', 'ejs');
// app.set("views", path.resolve(__dirname, "views"));


app.listen(PORT,()=> console.log(`Servidor corriendo en https://localhost:${PORT}`));


app.use('/', routerIndex);
app.use('/', routerUsers);

 