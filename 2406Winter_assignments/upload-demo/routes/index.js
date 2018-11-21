var express = require('express');
var router = express.Router();

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

var loggedInUsers = {};
var LoggedIn = 'TheUserIsLoggedIn';

function index(req, res) {
    if (req.session.username) {
        res.redirect("/users");
    } else {
	res.render('index', { title: 'COMP 2406 Upload Demo', 
			      error: req.query.error });
    }
}

function users(req, res) {
    if (req.session.username) {
	res.render("account.jade", {username:req.session.username,
				    title:"Account",
				    loggedInUsers: loggedInUsers,
				    stats: req.session.stats});
    } else {
	res.redirect("/?error=Not Logged In");
    }
};

function uploadText(req, res) {
    var theFile = req.file;
    if (req.file) {
	req.session.files.push(theFile);
	req.session.stats.push({name: theFile.originalname,
                size: theFile.size});
                
	res.send("File uploaded succeeded");
	console.log(theFile);
	console.log("First 80 bytes as text:");
	console.log(theFile.buffer.toString('utf8',0,80));
    } else {
	res.send("File upload failed");
    }
}

function login(req, res) {
    var username = req.body.username;
    req.session.username = username;
    req.session.files = [];
    req.session.stats = [];
    loggedInUsers[username] = LoggedIn;
    res.redirect("/users")
}

function logout(req, res) {
    delete loggedInUsers[req.session.username];
    req.session.destroy(function(err){
        if(err){
            console.log("Error: %s", err);
        }
    });
    res.redirect("/");
}

router.get('/', index);
router.get('/users', users);
router.post("/login", login);
router.post("/logout", logout);
router.post("/uploadText", upload.single('theFile'), uploadText);

module.exports = router;
