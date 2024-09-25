const { connection } = require('./db');

const cors = require('cors'); // CORS = Cross Origin Resource Sharing

const express = require('express');
const app = express();
const port = 3005;

// Prepares the express app to accept JSON data
app.use(express.json());

// Allows the app to accept requests from any origin
app.use(cors());

// API to add a user
app.post('/add', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Please provide all the required fields');
    }

    const query = `INSERT INTO users VALUES (NULL , '${name}', '${email}', MD5('${password}'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    connection.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error(`Error inserting user : ${err}`);
            return res.send('Error adding user');
        }
        res.send(`${name} added successfully`);
    });
});

// API to search for a user
app.get('/search', (req ,res) => {
    let name = req.query.name;
    if (name) {
        const query = `SELECT * FROM users WHERE name LIKE '%${name}%'`;
        connection.query(query, (err, result) => {
            if (err) {
                console.error(`Error fetching users : ${err}`);
                return res.send('Error fetching users');
            }
            res.send(result);
        });
    }
    else res.send('Please provide a name to search');
})

// API to view all users
app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error(`Error fetching users : ${err}`);
            return;
        }
        res.send(result);
    });
});

// API to add two numbers
// app.get('/', (req, res) => {
//     const num1 = parseFloat(req.query.num1);
//     const num2 = parseFloat(req.query.num2);
//     const operator = req.query.operator;

//     if (isNaN(num1) || isNaN(num2)) {
//         return res.send('Please provide valid numbers as query parameters');
//     }

//     if (operator === '+') {
//         let result = num1 + num2;
//         res.send(`The result of ${num1} + ${num2} is ${result}`);
//     } 
//     else if (operator === '-') {
//         let result = num1 - num2;
//         res.send(`The result of ${num1} - ${num2} is ${result}`);
//     } 
//     else {
//         res.send('Please provide a valid operator (+ or -)');
//     }
// });

app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
});
