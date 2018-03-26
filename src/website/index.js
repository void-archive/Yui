const Express = require('express');
const Passport = require('passport');
const Discord = require('passport-discord').Strategy;
const app = Express();
app.disable('x-powered-by');