
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
 
app.get('/', function(req,res){
  res.sendfile('index.html')
})

app.listen(3001, function(){
	console.log('Server listening on port ', 3001)
})
 
