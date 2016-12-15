/**
 * Created by jmoor6 on 12/12/16.
 */
var express = require('express');
var app = express();

app.use(express.static('./bin'));

app.set('view engine', 'ejs');
app.set('views', 'src/server'); // tell Express our templates are in a different folder than the default

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});