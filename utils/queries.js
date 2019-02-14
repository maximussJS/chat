module.exports = {
    getAllUsers : () => 'SELECT * FROM users;',
    getUserByLogin : login => `SELECT * FROM users WHERE login = '${login}';`,
    getUserByLoginAndPassword : (login,pass) => `SELECT * FROM users WHERE login = '${login}' AND password = '${pass}';`,
    insertNewUser : (name,login,password,image,created) => {
        `INSERT INTO users (name, login, password, image, created)
         VALUES ('${name}', '${login}', '${password}', '${image}', '${created}');`
    }
}
