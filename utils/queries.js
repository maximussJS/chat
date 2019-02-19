module.exports = {
    createUserTable : () =>
            `CREATE TABLE IF NOT EXISTS users(
             id SERIAL PRIMARY KEY,
             name VARCHAR(20) NOT NULL,
             login VARCHAR(20) UNIQUE NOT NULL,
             password VARCHAR(250) NOT NULL,
             image VARCHAR(250) NOT NULL,
             created TIMESTAMP DEFAULT NOW());`,

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
             login VARCHAR(20) NOT NULL,
             text VARCHAR(250) NOT NULL,
             image VARCHAR(250) NOT NULL,
             created TIMESTAMP DEFAULT NOW());`,

    getAllMessages : () => 'SELECT * FROM messages',

    insertNewMessage : (text,login,image) => `INSERT INTO messages(text, login, image) 
                                              VALUES ('${text}', '${login}', '${image}')
                                              RETURNING *;`
}
