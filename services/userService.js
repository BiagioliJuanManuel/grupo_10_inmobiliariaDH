const path = require('node:path');
const fs = require('fs');
const FORMAT = 'utf-8';


const User = {
    file: path.resolve(__dirname, '../data/users-mock.json'),
    
    getUsers(){
        return JSON.parse(fs.readFileSync(this.file, FORMAT));
    },

    findAll(){
        return this.getUsers();
    },

    generateId(){
        let allUser = this.findAll();
        let lastUser = allUser.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findByPk(id){
        let allUser = this.findAll();
        let userFound = allUser.find(u => u.id === id);
        return userFound;
    },
    
    findByField(field, text){
        let allUser = this.findAll();
        let userFound = allUser.find(u => u[field] === text);
        return userFound;
        
    },
    
    saveUser(userData){
        let allUser = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        
        allUser.push(newUser);
        fs.writeFileSync(this.file, JSON.stringify(allUser,null, ' '));
        return newUser;
    },
    
    deleteUser(id){
        let allUser = this.findAll();
        let finalUsers = allUser.filter( u => u.id !== id);
        fs.writeFileSync(this.file, JSON.stringify(finalUsers,null, ' '));
        return true;
    }


}

module.exports = User;