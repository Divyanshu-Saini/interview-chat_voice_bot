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
const client = requestJson.createClient(process.env.REQ_URL_Question);
var json;
const randomQues = [];
const randomAns = [];
var quest = [],
    answer = [];

function loadQuestion() {
    //load question and answer
    request.get(process.env.REQ_URL_INTERQA, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            json = JSON.parse(body);
            console.log(json);
            for (let qa of json) {
                quest.push(qa.question);
                answer.push(qa.ans);
            }
            console.log("nodemon watching");
            console.log("Question :", quest);
            console.log("Answer :", answer);
        } else {
            console.log('Error occured :', err);
        }
    });
}


//scores
var score = [];
//variables
var msg = '';
var uid = '';
var name = '';
var qualification = '';
var emailid = '';
var u_score = undefined;
var interview_cleared = undefined;
var user = undefined;
var count = 0;
var c_ansCount = 0;

router.post('/rndQa-webhook', (req, res) => {
    //user intro custom
    if (req.body.result.action === 'custom.name.qa.e') {
        if (req.body.result.action === 'custom.name.qa.e') {
            name = req.body.result.parameters['name'];
            qualification = req.body.result.parameters['qualifiation'];
            emailid = req.body.result.parameters['email'];
            uid = uuid.v1();
            console.log('User Introduction :', req.body.result.resolvedQuery)
            msg = 'Nice to meet you ' + name + ' ready for the interview?';
            count = 0;
            quest = [];
            answer = [];
            loadQuestion();
            return res.json({
                speech: msg,
                displayText: msg,
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
            });
        }
    }

    //user intro system
    if (req.body.result.action === 'sys.name.qa.e') {
        if (req.body.result.action === 'sys.name.qa.e') {
            name = req.body.result.parameters['given-name'];
            qualification = req.body.result.parameters['qualifiation'];
            emailid = req.body.result.parameters['email'];
            uid = uuid.v1();
            console.log('User Introduction :', req.body.result.resolvedQuery)
            msg = 'Nice to meet you ' + name + ' ready for the interview?';
            count = 0;
            quest = [];
            answer = [];
            loadQuestion();
            return res.json({
                speech: msg,
                displayText: msg,
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
            });
        }
    }

    //restart event yes
    if (req.body.result.action === 'restart.restart-yes') {
        count = 0;
        quest = [];
        answer = [];
        loadQuestion();
        res.json({
            "followupEvent": {
                "name": "WELCOMEEVENT"
            }
        })
    }
    //restart event no
    if (req.body.result.action === 'restart.restart-no') {
        res.json({
            "followupEvent": {
                "name": "QA"
            }
        })
    }

    //exit event yes
    if (req.body.result.action === 'exitevent.exitevent-yes') {
        count = 0;
        res.json({
            "followupEvent": {
                "name": "EXITEVENT"
            }

        })
    }
    //exit event no
    if (req.body.result.action === 'exitevent.exitevent-no') {
        res.json({
            "followupEvent": {
                "name": "INTROEVENT"
            }

        })
    }

    // default fallback event
    if (req.body.result.action === 'input.unknown') {
        if (req.body.result.action === 'input.unknown') {
            console.log("Count in fallback event :", count)
            let rnd = Math.floor(Math.random() * quest.length);
            console.log(rnd);
            console.log('User response in fallback :', req.body.result.resolvedQuery)
            score.push(0);
            console.log('Scores in fallback :', score);
            if (count == 10) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                console.log("Correct answer in calculating result :",c_ansCount);
                if (c_ansCount >= 5) {
                    msg = 'Congratulations!!! ' + name + '. Your score is ' +c_ansCount + 'out of 10. You have sucessfully cleared the interview';
                    interview_cleared = true;
                } else {
                    msg = 'Sorry ' + name + ' Your score is ' + c_ansCount + 'out of 10. You havent cleared the interview try later ';
                    interview_cleared = false;
                }
                user = {
                    uid: uid,
                    name: name,
                    qualification: qualification,
                    email: emailid,
                    score: c_ansCount,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                score = [];
                count = 0;
                quest = [];
                answer = [];
                loadQuestion();
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[rnd]
                console.log("Answer fallback ", answer)
                quest.splice(rnd, 1);
                answer.splice(rnd, 1)
                console.log("From falback event :", quest)
                console.log("Answer after fallback ", answer)
                console.log(msg)
            }
            count++;
            return res.json({
                speech: msg,
                displayText: msg,
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
            })
        }
    }

    //quest 1
    if (req.body.result.action === 'question1') {
        if (req.body.result.action === 'question1') {
            console.log('welcome intent yes :', req.body.result.resolvedQuery)
            count++;
            let msg = quest[0];
            quest.splice(0, 1);
            console.log("Sliced value in question 1 is =", quest)
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
            });
        }
    }

    //RNDQA Question
    if (req.body.result.action === 'rndQa') {
        if (req.body.result.action === 'rndQa') {
            console.log('User response From RNDQA :', req.body.result.resolvedQuery);
            // if(count==0){
            //     msg =' Tell me '+ quest[count];
            //     count++;
            // }else
            if (count == 10) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                console.log("Correct answer in calculating result :",c_ansCount);
                if (c_ansCount >= 5) {
                    msg = 'Congratulations!!! ' + name + '. Your score is ' +c_ansCount + 'out of 10. You have sucessfully cleared the interview';
                    interview_cleared = true;
                } else {
                    msg = 'Sorry ' + name + ' Your score is ' + c_ansCount + 'out of 10. You havent cleared the interview try later ';
                    interview_cleared = false;
                }
                user = {
                    uid: uid,
                    name: name,
                    qualification: qualification,
                    email: emailid,
                    score: c_ansCount,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                score = [];
                count = 0;
                quest = [];
                answer = [];
                loadQuestion();
                console.log(msg)
            } else {
                let resolvedQuery = req.body.result.resolvedQuery;
                let quesCount = 0;
                let ansCount = 0;
                console.log('Answer is :', answer[ansCount])
                console.log('user Answer is :', resolvedQuery)
                let sc = 10 * similarity(answer[ansCount--], resolvedQuery);
                console.log("3:", sc)
                if(sc>=2){
                    c_ansCount++;
                }
                score.push(parseInt(sc));
                console.log("Correct answer:",c_ansCount);
                console.log(score);
                msg = ' Your next question is :' + quest[quesCount]
                console.log(msg)
                console.log("Answer before rndquest ", answer)
                quest.splice(0, 1);
                answer.splice(0, 1)
                console.log("Question rndquest ", quest)
                console.log("Answer after rndquest ", answer)
                count++;
            }
            return res.json({
                speech: msg,
                displayText: msg,
            });
        } else {
            return res.json({
                speech: 'Some error occured',
                displayText: 'Some error occured',
            })
        }
    }
});

//exporting router
module.exports = router;