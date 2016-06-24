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

app.post( '/deleteItem', urlencodedParser, function( req, res ){
  console.log( 'in deleteUser: ' + req.body.id );
  pg.connect( connectionString, function( err, client, done ){
    client.query('DELETE from users WHERE id=($1)', [req.body.id]);
  });
});

app.post( '/updateStatus', urlencodedParser, function( req, res ){
  console.log( 'in updateStatus: ' + req.body.status );
  pg.connect( connectionString, function( err, client, done ){
    client.query('UPDATE users SET status=true WHERE id=($1)', [req.body.id]);
  });
});

app.get( '/getStatus', urlencodedParser, function(req, res){
  console.log(req.body.status);
  var statusArray = [];
  pg.connect(connectionString, function(err, client, done){
    var status = client.query('SELECT status FROM users');
    status.on('row', function(row){
      statusArray.push(row);
    });
    status.on('end', function(){
      return res.json(statusArray);
    });
  });
  console.log("in getStatus: " + statusArray);
}); //end get status
