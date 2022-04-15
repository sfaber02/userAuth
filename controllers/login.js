const bcrypt = require("bcrypt");
const db = require("../db/dbConfig.js");
const jwt = require("jsonwebtoken");
const { doesUserExist } = require("../queries/userQueries.js");


exports.login = async (req, res) => {
    const { email, password} = req.body;
    
    try {
        const user = await db.query (`SELECT * FROM users WHERE email='${email}'`);
        if (user.length === 0) {
            res.status(400).json({ error: 'User not registered.  Please register first' });
        } else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500).json({error});
                } else if (result) {
                    const token = jwt.sign(
                        {
                            email
                        },
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({ message: 'USER signed in!', token })
                } else {
                    if (result != true)
                      res.status(400).json({
                        error: "Enter correct password!",
                      });
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
