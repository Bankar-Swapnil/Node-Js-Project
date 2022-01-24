const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/LogInDev', {useNewUrlParser: true});
const port = 8000;


const LogInSchema = new mongoose.Schema({
    name: String,
    email:String,
    birthday:String,
    phone: String,
    birthday:String
    
  });

  
const LogIn = mongoose.model('LogIns', LogInSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('login.pug', params);
})

app.post('/', (req, res)=>{
    var myData = new LogIn(req.body);
    myData.save().then(()=>{
    // res.send('This item has been saved to the database')
    res.render('home.pug');
    
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
    })
})


app.get('/home', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('home.pug', params);
})
app.get('/HTML', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('html.pug', params);
})

app.get('/CSS', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('css.pug', params);
})

app.get('/Java', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('java.pug', params);
})

app.get('/Mongodb', (req, res)=>{
    const params = {'title': 'Web Devlopers CheatSheet'}
    res.status(200).render('mongo.pug', params);
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
