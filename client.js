const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const csp = require('helmet-csp');
const favicon = require('serve-favicon');
const crypto = require('crypto')

const args = require('yargs').argv;
let defaultDomain = 'ymail';

if (args.domain === 'yahoo') {
    defaultDomain = 'yahoo';
}

app.set('etag', false);
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'views'))

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use((_, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('hex');
    next();
});

app.use(csp({
    directives: {
        defaultSrc: ["'self'", (_, res) => `'nonce-${res.locals.nonce}'`],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", '*.ymail.com:8000', '*.yahoo.com:8000', '*.yahoo.com:5000'],
        mediaSrc: ["'self'", '*.yahoo.com', '*.ymail.com:8000', '*.yahoo.com:8000', '*.yahoo.com:5000']
    }
}));

app.use(cookieParser('sathish'));

app.use(function (req, res, next) {
    const cookie = req.cookies && req.cookies.cookieName;

    if (cookie === undefined) {

        const options = {
            domain:'yahoo.com',
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true,
            signed: true
        };

        res.cookie('S', { name: 'sathish@yahoo.com' }, options);

        console.log('Client Cookie created successfully');
    } else {
        console.log('Client Cookie exists');
    }

    next();
});

app.get('/', (_, res) => {
    res.status(200);

    const domain = `dl-mail-test.${defaultDomain}.com`;
    const token = Date.now();
    const messages = [
        {
            name: 'Message 1',
            src: `http://${domain}:8000/images/yahoo.png?token=${token}`
        },
        {
            name: 'Message 2',
            src: `http://${domain}:8000/images/shopping.png?token=${token}`
        },
        {
            name: 'Message 3',
            src: `http://${domain}:8000/images/categorization.png?token=${token}`
        },
        {
            name: 'Message 4',
            src: `http://${domain}:8000/images/accounts.png?token=${token}`
        }
    ];

    console.log(res.locals.nonce);

    res.render('index', {messages, nonce: `nonce-${res.locals.nonce}`, appData: JSON.stringify(messages)});
});

module.exports = app;