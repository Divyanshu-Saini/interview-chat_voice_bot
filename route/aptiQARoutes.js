//importing package
const express = require('express');
const aptiQA = require('../model/aptiQA');

// initialising
const router = express.Router();

//defing routes
router.get('/getQA', (req, res) => {
    aptiQA.find((error, result) => {
        if (error)
            res.status(404).json({
                Messsage: 'Some Error Occured',
                ErrorDetail: Error
            });
        else
            res.status(200).json(result);
    });
});

router.post('/getQA', (req, res) => {
    var data = new aptiQA(req.body);
    data.save((error, result) => {
        if (error)
            res.status(404).json({
                Messsage: 'Some Error Occured',
                ErrorDetail: Error
            });
        else
            res.status(200).json(result);
    })
});

//exporting router
module.exports = router;