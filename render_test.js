let express = require('express');
let firebase = require('firebase');
let app = express();
var firebaseConfig = {
    apiKey: "AIzaSyCv-nYWWAfC7eEV_Wi28tkTFVeglluAhX8",
    authDomain: "test-58f4f.firebaseapp.com",
    databaseURL: "https://test-58f4f.firebaseio.com",
    projectId: "test-58f4f",
    storageBucket: "test-58f4f.appspot.com",
    messagingSenderId: "324072983723",
    appId: "1:324072983723:web:231ff5fa1ce32f34fdfbee",
    measurementId: "G-V3Q1VPLEHY"
  };
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    let data = await db.collection("classA").get();
    let userArr = [];
    data.docs.forEach((doc) => {
        userArr.push(doc.data().name);
    })
    res.render("default", { 
        users: userArr,
        // users: ["Alice", "Bob", "Fisheep", "Fiona"],
        title: "This is root page!"
    })
})
app.listen(3000, () => {
    console.log("render_test server is running at http://127.0.0.1:3000")
})