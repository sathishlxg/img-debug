var path = require('path');
const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const favicon = require('serve-favicon');

const args = require('yargs').argv;
let defaultDomain = 'ymail';

if (args.domain === 'yahoo') {
    defaultDomain = 'yahoo';
}

const redirect_url = `http://dl-mail-test.${defaultDomain}.com:8000/images`;

app.set('etag', false);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(cookieParser('sathish'));

// set a cookie
app.use(function (req, res, next) {
    var cookie = req.cookies && req.cookies.cookieName;

    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);

        var options = {
            domain:'ymail.com',
            maxAge: 1000 * 60 * 1, // would expire after 1 minute
            httpOnly: true,
            signed: true
        }

        res.cookie('DL', randomNumber, options);

        console.log('YMail cookie created successfully');
    }

    next();
});

app.get('/images/:id', (req, res) => {
    if (isTokeValid(req.query.token)) {
        res.status(200);
        res.set('Content-Type', 'image/png');
        res.sendFile(req.params.id,  { root: path.join(__dirname, 'public', 'imgs') });
    } else {
        res.redirect(307, `http://apis-test.mail.yahoo.com:5000/refresh?redirect_url=${redirect_url}/${req.params.id}`);
    }
});

function isTokeValid(token) {
    if (!token) {
        return false;
    }

    const millis = Date.now() - +token;
    const elapsedTime = Math.floor(millis/1000);

    console.log(`seconds elapsed = ${elapsedTime}`);

    if (elapsedTime > 4) {
        console.log(`Expired token, fecthing new token`);

        return false;
    }

    return true;
}

module.exports = app;
