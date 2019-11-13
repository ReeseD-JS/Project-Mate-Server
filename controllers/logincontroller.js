var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/', function (req, res) {
    User.findOne( { where: { username: req.body.user.username} } )
    .then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else{
                        res.status(502).send({ error: "Sorry, Bad Gateway"});
                    }
                });
            } else {
                res.status(500).send({ error: "Sorry, There Was an Internal Error" });
            }
        },
        function (err) {
            res.status(501).send({ error: "Sorry, Something Went Terribly Wrong" });
        }
    );
});



module.exports = router;