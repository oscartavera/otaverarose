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
        sess.message ='Debe iniciar sesión primero.';
        res.redirect('/')
    }
})
module.exports = router;