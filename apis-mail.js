var app = require('express')();

app.use(require('cookie-parser')('sathish'));

app.set('etag', false);

function parseCookie(req) {
    const cookie = req.signedCookies;

    if (!cookie || !cookie.S || !cookie.S.name) {
        return '';
    }

    return cookie.S.name;
}

app.use(function (req, res, next) {
    const cookie = parseCookie(req);

    if (cookie !== 'sathish@yahoo.com') {

        res.status(401).send('Unauthozied!!');

        return;
    }

    next();
});

app.get('/refresh', (req, res) => {
    res.status(307).redirect(req.query.redirect_url + '?token=' + Date.now());
});

module.exports = app;