const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const Login = require('./utils/login')
const Register = require('./utils/register')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const interface = require('./utils/interface')

const app = express()
const port = process.env.PORT || 8082

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({secret:"rose", cookie:{maxAge:2000}}));
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// seccion para logeados
app.use(interface)
var sess;
app.post('/login', function (req, res) {
    let {body} = req
    sess = req.session;
    Login(body).then(function(result){
        sess.token = result.Token 
        sess.user  = result.Name
        sess.email = result.Email
        res.redirect('/system');
    }).catch(function(error){
        if(error.response.status==422){
            e = error.response.data.errors;
            sess.message = e[0].msg; 
        }else{
            sess.message = 'Cannot login.'; 
        }
        return res.redirect('/')
    });
        /*res.cookie('sessionToken', user.token, { expire: 1500 + Date.now()});
        res.cookie('userData', user.user, { expire: 1500 + Date.now()});*/     
})

app.get('/', (req, res) => {
    sess = req.session;
    data = {}
    if(sess.message){
        data.message = sess.message
    }
    res.render('signIn', data)
})

app.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.get('/register', function (req, res) { 
    sess = req.session;
    var data={}
    if(sess.message){
        data.message = sess.message
    }
    res.render('signUp',data)
})

app.post('/signUp', function (req, res) { 
    let {body} = req
    sess = req.session;
    Register(body).then(function(result){
        console.log(result);
        res.redirect('/system');
    }).catch(function(error){
        if(error.response.status==422){
            e = error.response.data;
            console.log(e);
            sess.message = e.message; 
        }else{
            sess.message = 'Cannot register.'; 
        }
        res.redirect('/register');
    });
})

app.get('/logOut', function(req, res){
    res.clearCookie("sessionToken")
    res.clearCookie("userData")
    req.session.destroy()
    res.redirect('/')
})

app.get('/signUp', (req, res) => {
    res.render('signUp', {})
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Oscar Tavera',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})