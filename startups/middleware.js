'use strict';
const path = require('path');
const helmet = require("helmet");
const logger = require('morgan');
const cors = require("cors");
module.exports = (app, express) => {
    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use(cors());
    app.set(helmet());
    app.use(logger('combined'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
};