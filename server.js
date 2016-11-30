'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const ua = require('./server/middlewares/ua');
const serverRender = require('./dist/serverRender');
const cors = require('cors');
const uri = require('urijs');
const CONFIG = require('./config.json');

const app = new express();
// will replace qbt logging tools
const logger = console;

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const publicPath = uri(CONFIG.STATIC_PREFIX).path() || '/';

app.use(publicPath, express.static(__dirname + '/dist'));

app.use(ua);

app.use(serverRender);

const PORT = process.env.PORT || 20000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  logger.info(`Server listening on ${HOST} port ${PORT}`);
});
