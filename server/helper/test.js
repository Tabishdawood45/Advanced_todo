// import fs from 'fs'
// import path from 'path'
// import { pool } from '../helper/db.js'
// // import jwt from 'jsonwebtoken'
// // const { verify } = jwt

// const __dirname = import.meta.dirname

// const initializeTestDb = () => {
//     const sql = fs.readFileSync(path.resolve(__dirname,"../todo.sql"), "utf8");
//     pool.query(sql)
// }

// const insertTestUser = (email, password) => {
//     hash(password,10,(error,hashedPassword) => {
//         pool.query('insert into account (email,password) values ($1,$2)',
//             [email,hashedPassword]
//         )
//     })
// }

// const getToken = (email) => {
//     return sign ({user: email}, process.env.JWT_SECRET_KEY)

// }

// export { initializeTestDb, insertTestUser, getToken }



import fs from 'fs';
import path from 'path';
import { pool } from '../helper/db.js';
import bcrypt from 'bcrypt';  // Import bcrypt for hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
import { fileURLToPath } from 'url'; // To get __dirname with ES modules

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Define __dirname

// Function to initialize test database with SQL file
const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), "utf8");
    pool.query(sql);
};

// Function to insert a test user with a hashed password
const insertTestUser = (email, password) => {
    bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) throw error;
        pool.query(
            'INSERT INTO account (email, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );
    });
};

// Function to generate a token for a given email
const getToken = (email) => {
    return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY);
};

export { initializeTestDb, insertTestUser, getToken };
