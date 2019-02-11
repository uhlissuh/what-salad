const path = require('path');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const food2Fork = require('./food2fork.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('static'));

app.get('/salad/:query', function (req, res) {
  let encodedQuery = req.params.query + encodeURIComponent(" salad");
  food2Fork.getRankedRecipes(encodedQuery)
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
      res.end();
    })
    .catch(data => {
      res.send(data);
      res.end();
    });
});

app.get('/seasonal', function(req, res) {
  console.log("inside seasonal");
  let winterVeggies = ["kale", "brussels sprouts", "blood orange", "orange", "grapefruit", "persimmon", "beet", "pomegranate"];
  let springVeggies = ["asparagus", "artichoke", "radishes", "carrot", "peas", "watercress"];
  let summerVeggies = ["blueberries", "arugula", "cucumber", "pepper", "tomato", "green bean", "corn", "fig", "strawberry", "zucchini", "melon"]
  let fallVeggies = ["squash", "apple", "pear", "cranberries", "pumpkin", "endive", "broccoli"]
  let currentMonth = new Date().getMonth() + 1;
  let currentVeggies = [];

  if (currentMonth === 12 || currentMonth <= 2) {
    currentVeggies = winterVeggies;
  } else if (3 >= currentMonth <= 5) {
    currentVeggies = springVeggies;
  } else if (  (6 >= currentMonth <= 8)) {
    let currentVeggies = summerVeggies;
  } else {
    currentVeggies = fallVeggies;
  }

  let randomNumber = Math.floor((Math.random() * currentVeggies.length));
  let query = currentVeggies[randomNumber] + " salad";

  food2Fork.getRankedRecipes(query)
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
      res.end();
    })
    .catch(data => {
      res.send(data);
      res.end();
    });


});


if (isDeveloping) {
  const webpack = require('webpack');
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
