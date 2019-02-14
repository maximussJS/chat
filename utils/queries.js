module.exports = {
    getAllUsers : () => 'SELECT * FROM users;',
    getUserByLogin : login => `SELECT * FROM users WHERE login = '${login}';`,
    getUserByLoginAndPassword : (login,pass) => `SELECT * FROM users WHERE login = '${login}' AND password = '${pass}';`,
    insertNewUser : (name,login,password,image) => {
        `INSERT INTO users (name, login, password, image)
         VALUES ('${name}', '${login}', '${password}', '${image}');`
    }
}
