/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/salad/:query', function (req, res) {
  console.log('HIII');
  const API_KEY = "8756beb18496b780f61372738958adf2";
  let query = req.params.query + " salad";
  console.log(query);
  let url = "http://food2fork.com/api/search?sort=r&key=" + API_KEY + "&q=" + encodeURIComponent(query);
  request(url, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    let recipesResponse = JSON.parse(body);
    let recipesArray = recipesResponse.recipes.slice(0, 3);
    console.log(recipesArray);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'recipes': recipesArray}));
    res.end();
  });

})


if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
