# norrin-img-debug
Debug Inline image issue in Safari v13.1

Add entry to `/etc/hosts` for the following domains

- 127.0.0.1       `apis-test.mail.yahoo.com`
- 127.0.0.1       `dl-mail-test.yahoo.com`
- 127.0.0.1       `dl-mail-test.ymail.com`
- 127.0.0.1       `test-mail.yahoo.com`

## How to run the app

clone the repo and `cd` into the project

Run `npm install`

Change **domain** to either yahoo or ymail 

`node index.js --domain=ymail`

When the domain is set to `yahoo` the inline images would be displayed,
but if it's changed to `ymail` all the inline images would be broken as the cookies get blocked
by the Safari

## How to test
Launch the browser and go to `http://test-mail.yahoo.com`
 
Note: The img request tokens are valid for only 5 seconds. When the images are fetched after the tokens expire the request would fail. When the application is run with `node index.js --domain=yahoo`, the images would load fine.
