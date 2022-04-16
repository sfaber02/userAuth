const db = require('../db/dbConfig.js');


const doesUserExist = async (email) => {
    try {
        const exists = await db.any (
            `SELECT EXISTS (SELECT 1 FROM users WHERE email='${email}');`
        );
        return exists[0].exists;
    } catch (error) {
        return error;
    }
}

const addUser = async (name, email, password) => {
    try {
        await db.query (
            `
                INSERT INTO users (name, email, password)
                VALUES ('${name}', '${email}', '${password}');
            `
        ) 
    } catch (err) {
        return err;
    }
}

const getUser = async (email) => {
    try {
        const result = await db.query(`SELECT * FROM users WHERE email='${email}'`);
        return result;
    } catch (err) {
        return err;
    }
}




module.exports = 
    { 
        doesUserExist,
        addUser,
        getUser,
    };