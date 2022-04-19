# user authorization backend

This backend will create new users and store them in a PSQL db 
and also handle authorize login requests from a frontend, returning a signed JWT.


## Dependencies
    - pg-promise
    - express
    - bcrypt
    - jwt
    - dotenv
    - cors


## Paths - 

- /user/register - registers a new user
    - takes a json body in the format
        {
            "name": "John,
            "email": "email@email.com",
            "password": "password123"
        }

- /user/login - validates credentials sent from front end against email/ pass stored in DB
    - takes a JSON body in the format :
        {
            "email": "email@email.com",
            "password": "password123"
        }
    - returns a signed jwt

## SQL Table Structure

Columns - 
    - id SERIAL PRIMARY KEY
    - name text NOT NULL
    - email text NOT NULL UNIQUE
    - password varchar NOT NULL
