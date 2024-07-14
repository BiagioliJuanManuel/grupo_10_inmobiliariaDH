const path = require('node:path'); 
const fs = require('node:fs');

let indexController = {
    index: function(req,res){
        res.render('home');
    },
    detalle: function(req,res){
        res.render('products/detalleDeProducto');
    },
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

module.exports = indexController;