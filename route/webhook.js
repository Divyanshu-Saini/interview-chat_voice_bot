//import packages
const express = require('express');
const aptiQA = require('../model/aptiQA');
const similarity = require('similarity');

//initialise router
const router = express.Router();

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
//scores
const score = [];
//variables
var msg = '';
var name = '';
var qualification = '';
//Webhook for interview
router.post('/interview-webhook', (req, res) => {
    console.log("Apiai request :", req.body);
    // let question = req.nody.result.fulfillment.speech;
    //quest 1
    if (req.body.result.action === 'question1') {
        name = req.body.result.parameters['given-name'];
        qualification = req.body.result.parameters['qualifiation'];
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
    //result
    if (req.body.result.action === 'result') {
        if (req.body.result.action === 'result') {
            console.log('Quest4 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(ans4, resolvedQuery);
            score.push(sc);
            console.log(score);
            let total = 0;
            for (let i of score) {
                total += i;
            }
            let avg = total / score.length;
            console.log('Average Score is ', avg);
            if (avg > 65) {
                msg = 'You scored ' + avg + 'you have sucessfully cleared the interview';
            } else {
                msg = 'You havent cleared the interview as your score is ' + avg;
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

//exporting router
module.exports = router