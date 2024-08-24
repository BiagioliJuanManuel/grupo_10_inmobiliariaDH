const path = require('node:path'); 
const fs = require('node:fs');
const data = require('../services/dataService');
const bcrypt = require('bcryptjs');

let usersController = {
    favorito: function(req,res){
        let title = 'Favoritos';
        res.render('products/favorito', { title });
    },
    login: function(req,res){
        let title = 'Login';
        res.render('users/login', { title });
    },
    registro: function(req,res){
        let title = 'Registro';
        res.render('users/registro', { title });
    },
    administracion: function(req,res){
        let css = '/css/administracion.css';
        let title = 'Administracion';
        res.render('users/administracion', { css, title });
    }
}

module.exports = usersController;