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

const addUser = async (name, email, phone, password) => {
    try {
        await db.query (
            `
                INSERT INTO users (id, name, email, password)
                VALUES ('12', '${name}', '${email}', '${password}');
            `
        )
    } catch (err) {
        return err;
    }
}




module.exports = 
    { 
        doesUserExist,
        addUser,
    };