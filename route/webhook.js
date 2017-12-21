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
var score = [];
//variables
var msg = '';
var uid = '';
var name = '';
var qualification = '';
var u_score = undefined;
var interview_cleared = undefined;
var user = undefined;
var count = 0;
//Webhook for interview
router.post('/interview-webhook', (req, res) => {
    // console.log("Apiai request :", req.body);
    // let question = req.nody.result.fulfillment.speech;
    //restart event
    if (req.body.result.action === 'restart') {
        res.json({
            "followupEvent": {
                "name": "WELCOMEEVENT"
            }
        })
    }
    //exit event
    if (req.body.result.action === 'exit') {
        res.json({
            "followupEvent": {
                "name": "EXITEVENT"
            }

        })
    }
    // default fallback event
    if (req.body.result.action === 'input.unknown') {
        if (req.body.result.action === 'input.unknown') {
            count++;
            console.log("COunt is",count)
            let rnd = Math.floor(Math.random() * 6);
            console.log(rnd);
            console.log('Quest1 :', req.body.result.resolvedQuery)
            // let resolvedQuery = req.body.result.resolvedQuery;
            // let sc = 100 * similarity(answer[rnd], resolvedQuery);
            // console.log("1:", sc)
            score.push(0);
            console.log(score);
            if (count == 5) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                if (avg > 65) {
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
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                score=[];
                // score.slice(0, score.length);
                count = 0;
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[rnd]
                console.log(msg)
            }
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
            count++;
            console.log("COunt is", count)
            console.log('Quest1 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(answer[0], resolvedQuery);
            console.log("1:", sc)
            score.push(parseInt(sc));
            if (count == 5) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                if (avg > 65) {
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
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
              score=[];
              count = 0;
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[1]
                console.log(msg)
            }
            return res.json({
                speech: msg,
                displayText: msg,
                // source: ''
            });
        }
        else {
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
            count++;
            console.log("COunt is", count)
            console.log('Quest2 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(answer[1], resolvedQuery);
            console.log("2:", sc)
            score.push(parseInt(sc));
            console.log(score);
            if (count == 5) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                if (avg > 65) {
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
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                // score.slice(0, score.length);
                score = [];
                count = 0;
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[2]
                console.log(msg)
            }
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
            count++;
            console.log("COunt is", count)
            console.log('Quest3 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(answer[2], resolvedQuery);
            console.log("3:", sc)
            score.push(parseInt(sc));
            console.log(score);
            if (count == 5) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                if (avg > 65) {
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
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                // score.slice(0, score.length);
                score = [];
                count=0;
                console.log(msg)
            }
            else {
                msg = ' Your next question is :' + quest[3]
                console.log(msg)
            }
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
    //quest5
    if (req.body.result.action === 'question5') {
        if (req.body.result.action === 'question5') {
            count++;
            console.log("COunt is", count)
            console.log('Quest3 :', req.body.result.resolvedQuery)
            let resolvedQuery = req.body.result.resolvedQuery;
            let sc = 100 * similarity(answer[3], resolvedQuery);
            console.log("3:", sc)
            score.push(parseInt(sc));
            if (count == 5) {
                let total = 0;
                for (let i of score) {
                    total += i;
                }
                let avg = total / score.length;
                u_score = parseInt(avg);
                console.log('Average Score is ', parseInt(u_score));
                if (avg > 65) {
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
                    score: u_score,
                    interview_cleared: interview_cleared,
                }
                client.post('getUser/', user, function (err, res, body) {
                    return console.log(res.statusCode);
                });
                // score.slice(0, score.length);
                score = [];
                count=0;
                console.log(msg);
            }
            else {
                msg = ' Your next question is :' + quest[4]
                console.log(msg)
            }
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
    // //quest6
    // if (req.body.result.action === 'question6') {
    //     if (req.body.result.action === 'question6') {
    //         console.log('Quest3 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[4], resolvedQuery);
    //         console.log("3:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         msg = ' Your next question is :' + quest[5]
    //         console.log(msg)
    //         return res.json({
    //             speech: msg,
    //             displayText: msg,
    //             // source: ''
    //         });
    //     } else {
    //         return res.json({
    //             speech: 'Some error occured',
    //             displayText: 'Some error occured',
    //             // source: 'weather'
    //         })
    //     }
    // }
    // //quest7
    // if (req.body.result.action === 'question7') {
    //     if (req.body.result.action === 'question7') {
    //         console.log('Quest3 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[5], resolvedQuery);
    //         console.log("3:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         msg = ' Your next question is :' + quest[6]
    //         console.log(msg)
    //         return res.json({
    //             speech: msg,
    //             displayText: msg,
    //             // source: ''
    //         });
    //     } else {
    //         return res.json({
    //             speech: 'Some error occured',
    //             displayText: 'Some error occured',
    //             // source: 'weather'
    //         })
    //     }
    // }
    // //quest8
    // if (req.body.result.action === 'question8') {
    //     if (req.body.result.action === 'question8') {
    //         console.log('Quest3 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[6], resolvedQuery);
    //         console.log("3:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         msg = ' Your next question is :' + quest[7]
    //         console.log(msg)
    //         return res.json({
    //             speech: msg,
    //             displayText: msg,
    //             // source: ''
    //         });
    //     } else {
    //         return res.json({
    //             speech: 'Some error occured',
    //             displayText: 'Some error occured',
    //             // source: 'weather'
    //         })
    //     }
    // }
    // //quest9
    // if (req.body.result.action === 'question9') {
    //     if (req.body.result.action === 'question9') {
    //         console.log('Quest3 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[7], resolvedQuery);
    //         console.log("3:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         msg = ' Your next question is :' + quest[8]
    //         console.log(msg)
    //         return res.json({
    //             speech: msg,
    //             displayText: msg,
    //             // source: ''
    //         });
    //     } else {
    //         return res.json({
    //             speech: 'Some error occured',
    //             displayText: 'Some error occured',
    //             // source: 'weather'
    //         })
    //     }
    // }
    // //quest9
    // if (req.body.result.action === 'question10') {
    //     if (req.body.result.action === 'question10') {
    //         console.log('Quest3 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[8], resolvedQuery);
    //         console.log("3:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         msg = ' Your next question is :' + quest[9]
    //         console.log(msg)
    //         return res.json({
    //             speech: msg,
    //             displayText: msg,
    //             // source: ''
    //         });
    //     } else {
    //         return res.json({
    //             speech: 'Some error occured',
    //             displayText: 'Some error occured',
    //             // source: 'weather'
    //         })
    //     }
    // }
    // //result
    // if (req.body.result.action === 'result') {
    //     if (req.body.result.action === 'result') {
    //         console.log('Quest4 :', req.body.result.resolvedQuery)
    //         let resolvedQuery = req.body.result.resolvedQuery;
    //         let sc = 100 * similarity(answer[9], resolvedQuery);
    //         console.log("4:", sc)
    //         score.push(parseInt(sc));
    //         console.log(score);
    //         if (count == 5) {


    //             let total = 0;
    //             for (let i of score) {
    //                 total += i;
    //             }
    //             let avg = total / score.length;
    //             u_score = parseInt(avg);
    //             console.log('Average Score is ', parseInt(u_score));
    //             if (avg > 65) {
    //                 msg = 'congratulations ' + name + ' you have sucessfully cleared our interview';
    //                 interview_cleared = true;
    //             } else {
    //                 msg = 'You havent cleared the interview try later ';
    //                 interview_cleared = false;
    //             }
    //             user = {
    //                 uid: uid,
    //                 name: name,
    //                 qualification: qualification,
    //                 score: u_score,
    //                 interview_cleared: interview_cleared,
    //             }
    //             client.post('getUser/', user, function (err, res, body) {
    //                 return console.log(res.statusCode);
    //             });
    //             score.slice(0, score.length);
    //             console.log(msg)
    //         }
    //     }
    //     return res.json({
    //         speech: msg,
    //         displayText: msg,
    //         // source: ''
    //     });
    //  } else {
    //     return res.json({
    //         speech: 'Some error occured',
    //         displayText: 'Some error occured',
    //         // source: 'weather'
    //     })

    // }
})

//exporting router
module.exports = router