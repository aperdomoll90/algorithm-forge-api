var admin = require("firebase-admin");
var serviceAccount = require("../../credentials.json");


let db;

function connectToFB() {
if(!db){
    admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
    })
    db = admin.firestore()
}};


exports.getAllUsers = (req,res) => {
    connectToFB()
    db.collection('users').get()
    .then((userList)=>{
        let allUsers =[]
        userList.forEach(user => allUsers.push(user.data()))
    })
    res.send(allUsers)
}

exports.newUser = (req,res)=>{
    connectToFB()
    const newData = req.data
    db.collection('users').add(newData)
    .then(()=> this.getAllUsers(req,res))
    .catch(err => res.send('Error creating new user', + err.message))
}