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

const quest = [],
    answer = [];
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

router.post('/rndQa-webhook', (req, res) => {
    //user intro
    if (req.body.result.action === 'intro') {
        if (req.body.result.action === 'intro') {
            name = req.body.result.parameters['given-name'];
            qualification = req.body.result.parameters['qualifiation'];
            emailid = req.body.result.parameters['email'];
            uid = uuid.v1();
            console.log('User Introduction :', req.body.result.resolvedQuery)
            msg = 'Nice to meet you ' + name + ' ready for the interview?';
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
            let rnd = Math.floor(Math.random() * 6);
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
                if (avg > 45) {
                    msg = 'congratulations ' + name + ' you have sucessfully cleared our interview';
                    interview_cleared = true;
                } else {
                    msg = 'You havent cleared the interview try later ';
                    interview_cleared = false;
                }
                user = {
                    uid: uid,
                    name: name,
                    qualification: qualification,
                    email: emailid,
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                score = [];
                count = 0;
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[rnd]
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
            count++
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

    //RNDQA event
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
                if (avg > 45) {
                    msg = 'congratulations ' + name + ' you have sucessfully cleared our interview';
                    interview_cleared = true;
                } else {
                    msg = 'You havent cleared the interview try later ';
                    interview_cleared = false;
                }
                user = {
                    uid: uid,
                    name: name,
                    qualification: qualification,
                    email: emailid,
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                score = [];
                count = 0;
                console.log(msg)
            } else {
                let resolvedQuery = req.body.result.resolvedQuery;
                let quesCount = count;
                let ansCount = count;
                console.log('Answer is :', answer[ansCount--])
                console.log('user Answer is :', resolvedQuery)
                let sc = 100 * similarity(answer[ansCount--], resolvedQuery);
                console.log("3:", sc)
                score.push(parseInt(sc));
                console.log(score);
                msg = ' Your next question is :' + quest[quesCount]
                console.log(msg)
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