const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
        doesUserExist,
        addUser,
        } = require('../queries/userQueries.js');


exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    
    if (await doesUserExist(email)) {
        res.status(400).json({error: 'User with that email already exists.'});
    } else {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(err).json({error: "Server Error"});
                return;
            } else {
                try {
                  await addUser(name, email, hash);
                  const token = jwt.sign(
                    //Signing a jwt token
                    {
                      email
                    },
                    process.env.SECRET_KEY
                  );
                  res.status(200).send('SUCCESS');
                } catch (err) {
                  res.status(500).send(err);
                }

            }
        });
    }
}

