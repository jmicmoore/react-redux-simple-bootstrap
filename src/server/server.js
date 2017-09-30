/**
 * Created by jmoor6 on 12/12/16.
 */
var express = require('express');
var app = express();
const router = express.Router();
const appBaseUrl =  '/my-cool-app';

if(process.env.NODE_ENV !== 'production'){
    console.log('Starting Development Environment...');

    var webpack = require('webpack');
    var webpackConfig = require('../../webpack.local.config');
    var compiler = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
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

app.set('view engine', 'ejs');
app.set('views', 'src/server'); // tell Express our templates are in a different folder than the default

router.use(express.static('./bin'));
router.get('*', function(req, res) {
    res.render('index', {
        appBaseUrl
    });
});

app.use(appBaseUrl, router);

app.listen(process.env.PORT || 3000, () => {

    if(process.env.NODE_ENV === 'development') {
        require('opener')('http://localhost:3000' + appBaseUrl);
    }

});