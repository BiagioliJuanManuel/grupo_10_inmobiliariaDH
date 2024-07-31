const path = require('node:path'); 
const fs = require('node:fs');
const data = require('../services/dataService');

let indexController = {
    propiedades: null,

    index: function(req,res){
        
        this.propiedades = data.load();
        res.render('home', { propiedades: propiedades });
        
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