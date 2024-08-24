const path = require('node:path');
const fs = require('node:fs');
const data = require('../services/dataService');

let indexController = {
    propiedades: null,

    index: function (req, res) {
        let css = '/css/home.css';
        let title = 'Bienvenido!';

        this.propiedades = data.load();
        res.render('home', { propiedades, css, title });

    },
    detalle: function (req, res) {
        let id = parseInt(req.params.id);
        this.propiedades = data.load();
        
        let propiedad = this.propiedades.find((prop) => prop.id === id);
        
        let title =  propiedad.name;
        if (propiedad != undefined) {
            res.render('products/detalleDeProducto', { propiedad, title });
        } else {
            let error = 'No se encontro niguna propiedad con el id: ' + id;
            res.send(error);
        }

    },
    listado: function (req, res) {
        let css = '/css/listado.css';
        let title = 'Propiedades';

        this.propiedades = data.load();
        res.render('products/propiedades', { propiedades , css , title});
    },
    editar: function (req, res) {
        let css = '/css/editar.css';
        this.propiedades = data.load();
        let id = parseInt(req.params.id);
        
        let propiedad = this.propiedades.find((prop) => prop.id === id);
        let title = 'Editar publicación ' + propiedad.name;
        res.render('products/editar', { propiedad , css, title});
    },
    actualizar: function (req, res) {
        const pool = req.body.pool === 'true';
        const courtyard = req.body.courtyard === 'true';

        this.propiedades = data.load();
        let id = parseInt(req.params.id)
        let propiedad = this.propiedades.find((prop) => prop.id === id);

        if (propiedad) {
            let images = propiedad.images || [];
            let nuevasPropiedades = this.propiedades.map(prop => {
                if (prop.id === id) {
                    prop = {
                        id: id,
                        name: req.body.name,
                        location: req.body.location,
                        features: {
                            square_meters: req.body.square_meters,
                            bathrooms: req.body.bathrooms,
                            bedrooms: req.body.bedrooms,
                            rooms: req.body.rooms,
                            pool: pool,
                            courtyard: courtyard,
                            garages: req.body.garages
                        },
                        category: req.body.category,
                        price: req.body.price,
                        closest: false,
                        images: images
                    };

                    if (req.files && req.files.length > 0) {
                        prop.images = prop.images.filter(img => img !== '/img/no-image_400x400.png');

                        req.files.forEach(file => {
                            prop.images.push('/img/' + file.filename);

                        });
                    } else if (prop.images.length === 0) {
                        prop.images.push('/img/no-image_400x400.png');
                    };
                }
                return prop;

            });
            
            data.save(nuevasPropiedades);
            res.redirect('/propiedades');      
        } else {
            res.status(404).send('Propiedad no encontrada');
        }


    },
    borrar: function (req, res) {
        let { id } = req.params;
        this.propiedades = data.load();

        let propiedad = this.propiedades.find((p) => p.id == id);

        if (propiedad) {
            propiedad.images.forEach(element => {
                if (element != '/img/no-image_400x400.png' && element != '/img/undefined') {
                    data.delete(element);
                }
            });

            let filterPropiedades = this.propiedades.filter((p) => p.id != id);
            data.save(filterPropiedades);

            res.redirect('/propiedades');
        } else {
            res.status(400).send(`La propiedad (id = ${id}) que intento borrar no fue encontrada`)
        }

    },
    crearGet: function (req, res) {
        let css = '/css/editar.css';
        let title = 'Nueva publicación'
        res.render('products/crear', { css, title });
    },
    crearPost: function (req, res) {
        const pool = req.body.pool === 'true';
        const courtyard = req.body.courtyard === 'true';

        this.propiedades = data.load();

        let highestId = 0;
        if (this.propiedades.length > 0) {
            highestId = this.propiedades.reduce((maxId, product) => {
                return product.id > maxId ? product.id : maxId;
            }, 0);
        }

        let newPropiedad = {
            id: highestId + 1,
            name: req.body.name,
            location: req.body.location,
            features: {
                square_meters: req.body.square_meters,
                bathrooms: req.body.bathrooms,
                bedrooms: req.body.bedrooms,
                rooms: req.body.rooms,
                pool: pool,
                courtyard: courtyard,
                garages: req.body.garages
            },
            category: req.body.category,
            price: req.body.price,
            closest: false,
            images: []
        };


        if (req.file) {
            newPropiedad.images.push('/img/' + req.file.filename);
        } else {
            newPropiedad.images.push('/img/no-image_400x400.png');
        }

        this.propiedades.push(newPropiedad);
        data.save(this.propiedades);

        res.redirect('/propiedades');

    },
    favorito: function (req, res) {
        res.render('products/favorito');
    }

}

module.exports = indexController;