﻿/*
 * GET home page.
 */
var express = require('express');
var inData = require('../backend/AWSInData');
var outData = require('../backend/ViewOutput');
var versionDebug = require('../test/VersionDebug');
var router = express.Router();

router.get('/', function (req, res) {
    //res.render('insertData', { state: 'Error bad hash', hash: hash, msg: data });
    res.render('index', {version: versionDebug.iot_getVersion()});
});

//posting data to database
//http://localhost:1337/insertData?hash=9i9yde5z7pelq833ir36&data=42
router.get('/insertData', function (req, res) {
    var hash = req.query.hash;
    var data = req.query.data;
    
    //res.render('index');
    inData.insertData(hash, data, res);
});

//reset a stream's data
//http://localhost:1337/resetData?hash=gjt75iehdjf7rhg893e3
router.get('/resetData', function (req, res) {
    var hash = req.query.hash;
    
    //res.render('index');
    inData.resetData(hash, res);
});

//view a stream, given the ID
//http://localhost:1337/views/testrunnercsv.csv
//http://localhost:1337/views/testrunnersvg.svg
//http://localhost:1337/views/testrunnerhtml
//http://localhost:1337/views/testRunnerPng.png
router.get('/views/:id', function (req, res) {
    var shortURL = req.params.id;
    
    //res.render('view', { hash: shortURL });
    outData.viewData(shortURL, res, req);
});

module.exports = router;