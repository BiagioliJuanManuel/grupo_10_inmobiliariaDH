const path = require('node:path');
const fs = require('fs');
const format = 'utf-8';

const data = {

    file: path.resolve(__dirname, '../data/props-mock.json'),

    load(){
        let propsJSON = fs.readFileSync(this.file);
        let propsObj = JSON.parse(propsJSON);
        return propsObj;
    },

    save(newData){
        let newFileJson = JSON.stringify(newData);
        fs.writeFileSync(path.join(__dirname, '../data/props-mock.json'), newFileJson, format);
    },

    delete(filePath){
        let file = path.join(__dirname, '../public', filePath);
        try {
            fs.unlinkSync(file);
            console.log(`El archivo ${filePath} ha sido borrado.`);
        } catch (err) {
            console.error(`Error al borrar el archivo ${filePath}:`, err);
        }
    }


}

module.exports = data;