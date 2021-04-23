const functions = require('firebase-functions');
const express = require('express');
const { getAllUsers, newUser } = require('./src/users/');

const app = express();

app.get('/users', getAllUsers);
app.get('/users/:useId', getUserById);
app.post('/users', newUser);

exports.app = functions.https.onRequest(app);
