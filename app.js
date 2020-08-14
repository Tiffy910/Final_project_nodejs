let express = require('express');
let firebase = require('firebase')
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');  
app.get('/', async (req, res) => {  
    let data = await db.collection('classA').get();
    let userArr = []
    data.forEach((doc) => {
        console.log(doc.data().name)
        userArr.push(doc.data().name);
    })
    res.render('default', {  
        title: '首頁',  
        // users: ['Fisheep', 'Fiona', 'Alice', 'Bob']
        users: userArr
    });  
});

app.get("/Tiffany", (req, res) => {
    res.send("<h1>Tiffany</h1>");
})

app.get("/firebase-test", async (req, res) => {
    let html = '';
    let data = await db.collection('classA').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    });
    res.send(html)
})

app.get("/classA_backend", async (req, res) => {
    let data = await db.collection('classA').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender
        })
    })
    res.render('classA', {
        users: userArr
    })
})

app.get("/classA_frontend", (req, res) => {
    let options = {
        root:  __dirname+"/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname+"/public");
    res.sendFile("/classA.html", options);
})

app.get('/who/:name', (req, res) => {  
    var name = req.params.name;  
    res.send(`This is ${name}`);  
});

app.get('/API/deleteMember', (req, res) => {
    db.collection('classA').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete Member id = ${req.query.id}!`)
})

app.get('/API/addMember', (req, res) => {
    db.collection('classA').add({
        name: req.query.name,
        gender: req.query.age,
        age: req.query.gender
    });
    console.log("Add member !!");
    res.send("Add member success!");
})

app.get('*', (req, res) => {  
    res.send('No Content');  
});
//*:對所有路徑而言

let port = process.env.PORT || 3000

app.listen(port, () => {  
    console.log('Listening on port 3000');  
}); 