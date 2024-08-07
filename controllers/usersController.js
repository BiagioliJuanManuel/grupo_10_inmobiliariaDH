const path = require('node:path'); 
const fs = require('node:fs');
const data = require('../services/dataService');

let usersController = {
    favorito: function(req,res){
        res.render('products/favorito');
    },
    login: function(req,res){
        res.render('users/login');
    },
    registro: function(req,res){
        res.render('users/registro');
    },
    administracion: function(req,res){
        res.render('users/administracion');
    }
}

module.exports = usersController;