module.exports = {
    createUserTable : () =>
            `CREATE TABLE IF NOT EXISTS users(
             id SERIAL PRIMARY KEY,
             name VARCHAR(20) NOT NULL,
             login VARCHAR(20) UNIQUE NOT NULL,
             password VARCHAR(250) NOT NULL,
             image VARCHAR(250) NOT NULL,
             created TIMESTAMP);`,

    deleteTable : tableName => `DROP TABLE IF EXISTS ${tableName};`,

    getAllUsers : () => 'SELECT * FROM users ;',

    getUserByLogin : login => `SELECT * FROM users WHERE login = '${login}';`,

    getUserByLoginAndPassword : (login,pass) =>`SELECT * FROM users WHERE login = '${login}' AND password = '${pass}';`,

    insertNewUser : (name,login,password,image) =>
        `INSERT INTO users (name, login, password, image)
         VALUES ('${name}', '${login}', '${password}', '${image}') RETURNING *;`,

    deleteUserByLogin : login => `DELETE FROM users WHERE login = '${login}' RETURNING *;`,

    createMessageTable : () =>
            `CREATE TABLE IF NOT EXISTS messages(
             id SERIAL PRIMARY KEY,
             author JSON NOT NULL,
             text VARCHAR(200) NOT NULL, 
             created TIMESTAMP DEFAULT NOW());`,
}
