const functions = require('firebase-functions');
const express = require('express');
const { getAllUsers, getUserById, newUser,updateUser,deleteUser } = require('./src/users/');

const app = express();

app.get('/users', getAllUsers); //get all users
app.get('/users/:useId', getUserById); //get user by ID
app.post('/users', newUser); //create New user
app.patch('/users/:userId', updateUser) // update User by id
app.delete('users/:userId', deleteUser) // delete User by id

exports.app = functions.https.onRequest(app);
