'use strict';

//importing packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');
const similarity = require("similarity");
const stringSimilarity = require('string-similarity');

//Access keys
const APIAI_ACCESS_KEY = '81bcf2482e904f5aa308b3c6ca14052f';

//initializing app
const app = express();
const spiaiApp = apiai(APIAI_ACCESS_KEY);

//Configuring port and other settings
app.set('PORT', (process.env.PORT || 2828));


//Using Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

//questions
const quest1 = 'What does MVC Stand for?',
    quest2 = 'What does Model represent in MVC?',
    quest3 = 'What does View represent in MVC?',
    quest4 = 'What is Controller in MVC?';

//answers
const ans1 = 'MVC stands for Model, View, Controller',
    ans2 = 'The model represents the data',
    ans3 = 'View represents user interface',
    ans4 = 'The controller is the decision maker';
//  `   which updates the view when the model changes and also adds event listeners to the view and updates the model when the user manipulates the view.`
//scores
const score = [];
//msg
var msg = '';

//Webhook for interview
app.post('/interview-webhook', (req, res) => {
    console.log("Apiai request :", req.body);

    // let question = req.nody.result.fulfillment.speech;

    //quest 1
    if (req.body.result.action === 'question1') {
        if (req.body.result.action === 'question1') {
            console.log('welcome intent yes :', req.body.result.resolvedQuery)
            return res.json({
                speech: quest1,
                displayText: quest1,
                // source: ''
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
                // source: 'weather'
            });
        }
    }
    //quest2
    if (req.body.result.action === 'question2') {
        if (req.body.result.action === 'question2') {
            console.log('Quest1 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(ans1, resolvedQuery);
            score.push(sc);
            console.log(score);
            msg = 'You scored ' + sc + 'in first question ' + ' Your next question is :' + quest2
            console.log(msg)
            return res.json({
                speech: msg,
                displayText: msg,
                // source: ''
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
                // source: 'weather'
            })
        }
    }
    //quest3
    if (req.body.result.action === 'question3') {
        if (req.body.result.action === 'question3') {
            console.log('Quest2 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(ans2, resolvedQuery);
            score.push(sc);
            console.log(score);
            msg = 'You scored ' + sc + 'in second question ' + ' Your next question is :' + quest3
            console.log(msg)
            return res.json({
                speech: msg,
                displayText: msg,
                // source: ''
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
                // source: 'weather'
            })
        }
    }
    //quest4
    if (req.body.result.action === 'question4') {
        if (req.body.result.action === 'question4') {
            console.log('Quest3 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(ans3, resolvedQuery);
            score.push(sc);
            console.log(score);
            msg = 'You scored ' + sc + 'in third question ' + ' Your next question is :' + quest4
            console.log(msg)
            return res.json({
                speech: msg,
                displayText: msg,
                // source: ''
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
                // source: 'weather'
            })
        }
    }
    //quest4
    if (req.body.result.action === 'result') {
        if (req.body.result.action === 'result') {
            console.log('Quest4 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(ans4, resolvedQuery);
            score.push(sc);
            console.log(score);
            let total = 0;
            for(let i of score){
                total += i;
            }
            let avg = total/score.length;
            console.log('Average Score is ',avg);
            if(avg>65){
                msg = 'You scored ' + avg + 'you have sucessfully cleared the interview';
            }else{
                msg = 'You havent cleared the interview as your score is '+avg;
            }
            console.log(msg)
            return res.json({
                speech: msg,
                displayText: msg,
                // source: ''
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
                // source: 'weather'
            })
        }
    }
})

function avgScore(arr){
    let total = 0;
    let avg =0;
    for(let i of arr.length){
        total += i;
    }
    avg = total/4;
    return avg;
}
//Starting server
const server = app.listen(app.get('PORT'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
    // console.log(similarity(ans1,'its stands for movie view controller'));
    // console.log(stringSimilarity.findBestMatch(ans1,['its stands for movie view controller']));

});
