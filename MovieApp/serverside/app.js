const mongoose = require('mongoose');
//specify where to find the schemas
const User = require('./models/user')
const Genre = require('./models/genre')
//connect and display the status 
mongoose.connect('mongodb+srv://IT6203:uPN74PfkBSyEPw69@cluster0.kzwt3bc.mongodb.net/IT6203?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("connected"); })
    .catch(() => { console.log("error connecting"); });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {

    console.log('This line is always called');
    //app.options('*', cors()); // include before other routes
    /*if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
      } else {
        res.header('Access-Control-Allow-Origin', '*');
      }*/
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

    next();
    /*app.options('/*', (_, res) => {
        res.sendStatus(200);
    });*/
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

//in the app.get() method below we add a path for the users API 
//by adding /users, we tell the server that this method will be called when the URL is http://localhost:8000/users is requested
app.get('/users', (req, res, next) => {
    //call mongoose method find (MongoDB db.Users.find())
    User.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});

//serve incoming post requests to /users
app.post('/users', (req, res, next) => {
    /*const user = req.body;
    console.log(user.firstName + " " + user.lastName);
    //sent an acknowledgment back to caller 
    res.status(201).json('Post successful');*/

    // create a new user variable and save request’s fields 
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        primaryNumber: req.body.primaryNumber,
        secondaryNumber: req.body.seondaryNumber,
        primaryEmail: req.body.primaryEmail,
        secondaryEmail: req.body.secondaryEmail,
        mood: req.body.mood,
        genre: req.body.genre,
        actor: req.body.actor,
    });

    //send the document to the database 
    user.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });
});

//serve incoming put requests to /users 
app.put('/users/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    primaryNumber: req.body.primaryNumber,
                    secondaryNumber: req.body.secondaryNumber,
                    primaryEmail: req.body.primaryEmail,
                    secondaryEmail: req.body.secondaryEmail,
                    mood: req.body.mood,
                    genre: req.body.genre,
                    actor: req.body.actor,
                }
            },
            { new: true }
        )
            .then((user) => {
                if (user) { //what was updated 
                    console.log(user);
                } else {
                    console.log("no data exist for this id");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log("please provide correct id");
    }
});

//find a student based on the id
app.get('/users/:id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Users.findOne())
    User.findOne({ _id: req.params.id })
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/users/:id", (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

//get genre list from TMDB API and log it to the console
const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjliNzYwN2U0NWExZTg3OWY4OWM0ZTlkYjVmNzE0ZCIsIm5iZiI6MTc0NTk3ODQ0MS4wOTUsInN1YiI6IjY4MTE4NDQ5MDkwNDAzZDgzNzYxNmNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tmMVzaWcLvd5GVL5I6swkFRiqa-vYvOVRb44lFvxzCc'
    }
};
 


fetch(url, options)
    .then(res => res.json())
    //.then(json => genre.save(json))
    .then(json => console.log(json))
    .catch(err => console.error(err));


/*options = JSON.parse(options, 'utf-8');
const genres = new Genre({
    //id: res.body.id,
    //name: res.body.name
})
async function loadGenres() {
    try {
        await Genre.insertMany(options);
        console.log('Done!');
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit();
    }
}
loadGenres();*/


//to use this middleware in other parts of the application
module.exports = app;