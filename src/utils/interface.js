var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser')
const session = require('express-session')
var sess;
router.get('/system', (req, res) => {
    sess = req.session;
    if(sess.email) {
        res.render('CompanyRegister', sess);
    }
    else {
        sess.message ='User not logged in, please authenticate.';
        res.redirect('/')
    }
})
router.get('/system/registerCompany', (req, res) => {
    sess = req.session;
    if(sess.email) {
        

    }
    else {
        sess.message ='User not logged in, please authenticate.';
        res.redirect('/')
    }
})
module.exports = router;