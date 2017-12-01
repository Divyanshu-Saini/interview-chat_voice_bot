//import packages
const dotenv = require('dotenv');
const express = require('express');
const aptiQA = require('../model/aptiQA');
const similarity = require('similarity');
const uuid = require('uuid');
const requestJson = require('request-json');
const request = require('request');


//initialise router
dotenv.load();
const router = express.Router();
const client = requestJson.createClient('http://0446c2aa.ngrok.io/interviewDBRoutes/');
var json;
const quest = [],
answer = [];
//load question and answer
request.get(process.env.REQ_URL_INTERQA, (err, response, body) => {
    if (!err && response.statusCode == 200) {
    json  = JSON.parse(body);
    console.log(json);
    for (let qa of json) {
        quest.push(qa.question);
        answer.push(qa.ans);
    }
      
        console.log("Question :", quest);
        console.log("Answer :", answer);
    } else {
        console.log('Error occured :', err);
    }
});




// //questions
// const quest1 = 'What does MVC Stand for?',
//     quest2 = 'What does Model represent in MVC?',
//     quest3 = 'What does View represent in MVC?',
//     quest4 = 'What is Controller in MVC?';
// //answers
// const ans1 = 'MVC stands for Model, View, Controller',
//     ans2 = 'The model represents the data',
//     ans3 = 'View represents user interface',
//     ans4 = 'The controller is the decision maker';
//scores
const score = [];
//variables
var msg = '';
var uid = '';
var name = '';
var qualification = '';
var u_score = undefined;
var interview_cleared = undefined;
var user = undefined;
//Webhook for interview
router.post('/interview-webhook', (req, res) => {
    console.log("Apiai request :", req.body);
    // let question = req.nody.result.fulfillment.speech;
    //quest 1
    if (req.body.result.action === 'question1') {
        name = req.body.result.parameters['given-name'];
        qualification = req.body.result.parameters['qualifiation'];
        uid = uuid.v1();
        if (req.body.result.action === 'question1') {
            console.log('welcome intent yes :', req.body.result.resolvedQuery)
            return res.json({
                speech: quest[0],
                displayText: quest[0],
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
            let sc = 100 * similarity(answer[0], resolvedQuery);
            score.push(parseInt(sc));
            console.log(score);
            msg = ' Your next question is :' + quest[1]
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
            let sc = 100 * similarity(answer[1], resolvedQuery);
            score.push(parseInt(sc));
            console.log(score);
            msg = ' Your next question is :' + quest[2]
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
            let sc = 100 * similarity(answer[2], resolvedQuery);
            score.push(parseInt(sc));
            console.log(score);
            msg = ' Your next question is :' + quest[3]
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
            let sc = 100 * similarity(answer[3], resolvedQuery);
            score.push(parseInt(sc));
            console.log(score);
            let total = 0;
            for (let i of score) {
                total += i;
            }
            let avg = total / score.length;
            u_score = parseInt(avg);
            console.log('Average Score is ', parseInt(sc));
            if (avg > 65) {
                msg = 'You scored ' + parseInt(sc) + 'congratulations ' + name + ' you have sucessfully cleared our interview';
                interview_cleared = true;
            } else {
                msg = 'You havent cleared the interview try later ' ;
                interview_cleared = false;
            }
            user = {
                uid: uid,
                name: name,
                qualification: qualification,
                score: u_score,
                interview_cleared: interview_cleared,
            }
            client.post('getUser/', user, function (err, res, body) {
                return console.log(res.statusCode);
            });
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