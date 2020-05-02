const express = require('express')
const app = express()
const router = express.Router();
const appBaseUrl =  '/my-cool-app';

if (process.env.NODE_ENV !== 'production'){
    console.log('Starting Development Environment...');

    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.local.config');
    const compiler = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}));

    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler));

} else {
    console.log('Starting Production Environment...');
}

app.set('view engine', 'ejs')
app.set('views', 'src/server')

router.use(express.static('./dist'))
router.get('*', function(req, res) {
    res.render('index.ejs', {
        appBaseUrl
    });
});
app.use(appBaseUrl, router);

app.listen(process.env.PORT || 3000, () => {
    if(process.env.NODE_ENV !== 'production') {
        require('opener')('http://localhost:3000' + appBaseUrl);
    }
});
