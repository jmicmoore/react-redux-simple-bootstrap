/**
 * Created by jmoor6 on 12/12/16.
 */
var express = require('express');
var app = express();

if(process.env.NODE_ENV !== 'production'){
    console.log('Starting Development Environment...');

    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.local.config');
    var compiler = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/',
        stats: {
            colors: true
        },
        historyApiFallback: true
    }));

    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler));
} else {
    console.log('Starting Production Environment...');
}


app.use(express.static('./bin'));

app.set('view engine', 'ejs');
app.set('views', 'src/server'); // tell Express our templates are in a different folder than the default

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(process.env.PORT || 3000, () => {

    if(process.env.NODE_ENV === 'development') {
        require('opener')('http://localhost:3000');
    }

});