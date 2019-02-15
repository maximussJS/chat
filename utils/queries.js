module.exports = {
    createUserTable : () =>
            `CREATE TABLE IF EXISTS users(
             id SERIAL PRIMARY KEY,
             name VARCHAR(20) NOT NULL,
             login VARCHAR(20) UNIQUE NOT NULL,
             password VARCHAR(250) NOT NULL,
             image VARCHAR(250) NOT NULL,
             created TIMESTAMP);`,

    deleteUserTable : () => 'DROP TABLE IF EXISTS users;',

    getAllUsers : () => 'SELECT * FROM users ;',

    getUserByLogin : login => `SELECT * FROM users WHERE login = '${login}';`,

    getUserByLoginAndPassword : (login,pass) =>`SELECT * FROM users WHERE login = '${login}' AND password = '${pass}';`,

    insertNewUser : (name,login,password,image) =>
        `INSERT INTO users (name, login, password, image)
         VALUES ('${name}', '${login}', '${password}', '${image}') RETURNING *;`,

    deleteUserByLogin : login => `DELETE FROM users WHERE login = '${login}' RETURNING *;`
}
