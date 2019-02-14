module.exports = {
    getAllUsers : () => 'SELECT * FROM users;',
    getUserByLoginAndPassword : (login, password) => `SELECT * FROM users WHERE login = ${login}, password = ${password} ;`
}
