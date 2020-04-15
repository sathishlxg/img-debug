const client = require('./client');
const dlMail = require('./dl-mail');
const apisMail = require('./apis-mail');
const clientPort = 80;
const dlMailPort = 8000;
const apisMailPort = 5000;

const args = require('yargs').argv;
let defaultDomain = 'ymail';

if (args.domain === 'yahoo') {
    defaultDomain = 'yahoo';
}

process.env.DOMAIN = defaultDomain;

client.listen(clientPort, () => console.log(`Mail app listening at http://test-mail.yahoo.com:${clientPort}`));
apisMail.listen(apisMailPort, () => console.log(`APIs listening at http://apis-test.mail.yahoo.com:${apisMailPort}`));
dlMail.listen(dlMailPort, () => console.log(`Downloader listening at http://dl-mail-test.${defaultDomain}.com:${dlMailPort}`));



