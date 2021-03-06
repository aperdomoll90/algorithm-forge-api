
var admin = require('firebase-admin');
var credentials = require('../../credentials.json');

let db;

function connectToFB() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
    db = admin.firestore();
  }
}

exports.getAllUsers = (req, res) => {
  connectToFB();
  db.collection('users')
    .get()
    .then(collection => {
      let allUsers = [];
      collection.forEach(doc => {
        let user = doc.data()
        user.id = doc.id
        allUsers.push(user);
      });
      res.send(allUsers);
    })
    .catch((err) => res.send('Error fetching user', +err.message));
};


exports.getUserById = (req, res) => {
  connectToFB();
  const {useId} = req.params
  db.collection('users').doc(useId).get()
  .then(doc => {
        let user = doc.data()
        user.id = doc.id
        res.send(user)
  })
  .catch((err) => res.send('Error fetching that staff member', +err.message));
}


exports.newUser = (req, res) => {
  connectToFB();
  const newData = req.body;
  db.collection('users')
    .add(newData)
    .then(() => this.getAllUsers(req, res))
    .catch((err) => res.send('Error creating new user', +err.message));
};

exports.updateUser = (req, res) => {
  connectToFB();
  const {userId} = req.params
  const newData = req.body
  db.collection('users').doc(userId).update(newData)
    .then(() => this.getAllUsers(req, res))
    .catch(err => res.status(500).send('Error updating this user: ' + err.message))
}



exports.deleteUser = (req, res) => {
  connectToFB();
  const { userId } = req.params
  db.collection('users').doc(userId).delete()
  .then(() => this.getAllUsers(req, res))
  .catch(err => res.status(500).send('Error deleting this user: ' + err.message))
}
