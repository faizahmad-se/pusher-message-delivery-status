var express = require('express');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var pusher = new Pusher({ appId: APP_ID, key: APP_KEY, secret:  APP_SECRET });
var pusher = new Pusher({ appId: "314073", key: "da857397f8eec3092630", secret:  "657d91ad4a1473b3014e" });

app.get('/',function(req,res){      
     res.sendFile('index.html', {root: __dirname });
});

app.use(express.static(__dirname + '/'));

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  console.log(`Authenticated with code: ${auth}`);
  res.send(auth);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});