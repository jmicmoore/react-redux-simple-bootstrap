/**
 * Created by jmoor6 on 12/12/16.
 */
var express = require('express');
var app = express();

app.use(express.static('./src/client'));

app.listen(3000, function () {
    console.log('Server listening on port 3000!')
});