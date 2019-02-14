module.exports = {
    getAllUsers : () => 'SELECT * FROM users;',
    getUserByLoginAndPassword : (login, pass) => `SELECT * FROM users WHERE login = '${login}' AND password = '${pass}';`
}
