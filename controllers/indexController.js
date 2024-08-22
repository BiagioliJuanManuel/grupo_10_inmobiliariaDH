const path = require('node:path');
const fs = require('node:fs');
const data = require('../services/dataService');

let indexController = {
    propiedades: null,

    index: function (req, res) {

        this.propiedades = data.load();
        res.render('home', { propiedades: propiedades });

    },
    detalle: function (req, res) {
        let id = parseInt(req.params.id);
        this.propiedades = data.load();

        let propiedad = this.propiedades.find((prop) => prop.id === id);

        if (propiedad != undefined) {
            res.render('products/detalleDeProducto', { propiedad });
        } else {
            let error = 'No se encontro niguna propiedad con el id: ' + id;
            res.send(error);
        }

    },
    listado: function (req, res) {
        this.propiedades = data.load();
        res.render('products/propiedades', { propiedades });
    },
    editar: function (req, res) {
        this.propiedades = data.load();
        let id = parseInt(req.params.id);

        let propiedad = this.propiedades.find((prop) => prop.id === id);
        res.render('products/editar', { propiedad });
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

                    if (req.files && Array.isArray(req.files)) {
                        prop.images = prop.images.filter(img => img !== '/img/no-image_400x400.png');

                        req.files.forEach(file => {
                            prop.images.push('/img/' + file.filename);

                        });
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
        res.render('products/crear');
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