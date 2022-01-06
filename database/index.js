const db = require("firebase-admin");
const serviceAccount = require("../config");

const firestore__ = db.initializeApp({
    credential: db.credential.cert(serviceAccount)
});
module.exports = firestore__