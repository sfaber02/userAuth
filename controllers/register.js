const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
        doesUserExist,
        addUser,
        } = require('../queries/userQueries.js');


exports.register = async (req, res) => {
    const {name, email, phoneNumber, password} = req.body;
    
    if (await doesUserExist(email)) {
        res.status(400).json({error: 'User with that email already exists.'});
    } else {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(err).json({error: "Server Error"});
                return;
            } else {
                await addUser(name, email, phoneNumber, hash);
                res.status(200).send('SUCCESS');
            }

            


        });
    }

    // res.status(200).send('req.body');
}


exports.register2 = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      
      
        bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          name,
          email,
          phonenumber,
          password: hash,
        };
        var flag = 1; //Declaring a flag

        //Inserting data into the database

        client.query(
          `INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phonenumber, user.password],
          (err) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "User added to database, not verified" });
            }
          }
        );
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};