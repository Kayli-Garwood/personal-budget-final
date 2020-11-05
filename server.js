const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;
const secretKey = 'Secret Key';
const jwtMW = exjwt ({
    secret: secretKey,
    algorithms: ['HS256']
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    for (let user of users) {
        if (username == user.username && password == user.password) {
            let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '7d'});
            res.json({
                success: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect. Please try again.'
            });
        }
    }
});

// app.post('/api/signup', (req, res) => {
//     const { username, password } = req.body;
//     res.json({
//         success: true,
//         myContent: 'You are signed up!'
//     });
// });

app.get('/api/LoggedIn', jwtMW, (req, res) => {
    res.json ({
        success: true,
        myContent: 'You are still logged in!'
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function (err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            err: 'Please log in to continue!'
        });
    }
    else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});