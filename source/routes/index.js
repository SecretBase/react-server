var express = require('express');
var router = express.Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'React Server Rendering',
    App: ReactDOMServer.renderToString(<App />)
  });


});

module.exports = router;
