var express = require('express');
var router = express.Router();
var User = require('../models/User');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();	
	res.redirect('/login');
}