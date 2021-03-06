let express = require('express');
let mongodb = require('mongodb');
let app = express();

let router = require('./router')
console.log(router)

let db;

let connectionString = 'mongodb+srv://ToDoAppUser:31Dec1986$@cluster0-ixsd4.mongodb.net/MyTests?retryWrites=true&w=majority';

mongodb.connect(connectionString, {
  useNewUrlParser: true
}, function(err, client) {

  if(err) {
    console.error(err);
  }

  db = client.db();
  console.log('successfully connected to db!');
  // console.log(db)
  app.listen(3000);
});

app.use(express.urlencoded({extended: false}));




app.get('/', function(req, res) {

    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">Welcome to 'My ToDo App'</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;" name="item">
              <button class="btn btn-primary" type="submit">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #1</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #2</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #3</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        </ul>
        
      </div>
      
    </body>
    </html>`);

});

app.post('/create-item', function(req, res) {

  if(db) {
    success = db.collection('pets').insertOne(
      {
        "name": req.body.item,
        "species": "cat"
      },
      function() {
        console.log(success);
        res.send('Succesfully inserted a new record');
      })
  } else {
    res.send('Thank you for submitting the form!');
  }
 
  // res.send('Thank you for submitting the form!');   
});

// app.listen(3000);

// app.get('/tournament/list', function(req, res) {
//   res.send({
//     name: 'Ganesh',
//   })
// });