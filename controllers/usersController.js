const path = require('node:path');
const fs = require('node:fs');
const data = require('../services/dataService');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

let usersController = {
    favorito: function (req, res) {
        let title = 'Favoritos';
        res.render('products/favorito', { title });
    },
    login: function (req, res) {
        let title = 'Login';
        res.render('users/login', { title });
    },
    registro: function (req, res) {
        let title = 'Registro';
        res.render('users/registro', { title });
    },
    registroProcess: function (req, res) {
        // let title = 'Registro';
        // console.log(req.body);

        let userFound = userService.findByField('email', req.body.email);

        if (!userFound) {

            let newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                telephone: req.body.telephone,
                email: req.body.email,
                password: req.body.password,
                category: 'usuario',
                image: ''
            }

            if (req.file) {
                newUser.image = '/img/' + req.file.filename;
            } else {
                newUser.image = '/img/no-image_400x400.png';
            }

            if (req.body.password == req.body.passwordConfirm) {
                newUser.password = bcrypt.hashSync(req.body.password, 10);
            }
            //TODO retornar a la vista en caso contrario y mostrar el error en validacion 
            let userGuardado = userService.saveUser(newUser);

            return res.redirect('users/login');
        } else {
            res.send('Ya hay un usuario con este email ' + userFound.email);
        }
        // res.render('users/registro', { title });
    },
    administracion: function (req, res) {
        let css = '/css/administracion.css';
        let title = 'Administracion';
        res.render('users/administracion', { css, title });
    }
}

module.exports = usersController;