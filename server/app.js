var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend_project';

app.listen( 8080, 'localhost', function(req, res){
    console.log('server listening on port 8080');
});

//making public folder static
app.use(express.static('public'));

//base url
app.get('/', function(req, res){
  console.log('base url');
  res.sendFile(path.resolve( 'views/index.html'));
});

//adds item to database
app.post('/addItem', urlencodedParser, function(req, res){
  console.log('ing add item: ' + req.body.input);
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO users (list_item, status, created) VALUES ($1, $2, $3)', [req.body.input, req.body.status, 'now()']);
    done();
  });
  res.end();
});//end addItem

app.get('/getItem', function(req, res){
  console.log('in getItem');
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    // selects list items
    var item = client.query('SELECT * FROM users');
    var rows = 0;
    item.on('row', function(row){
      results.push(row);
    });
    item.on('end', function(){
      return res.json(results);
    });
  });
});//end getItem

app.post('/deleteItem', function(req, res){
  pg.connect(connectionString, function( err, client, done){
    client.query('DELETE from users WHERE id=($1)', [req.body.id]);
  });
});
