# norrin-img-debug
Debug Inline image issue in Safari v13.1

Add entry to `/etc/hosts` for the following domains

- 127.0.0.1       `apis-test.mail.yahoo.com`
- 127.0.0.1       `dl-mail-test.yahoo.com`
- 127.0.0.1       `dl-mail-test.ymail.com`
- 127.0.0.1       `test-mail.yahoo.com`

Change **port** to yahoo or ymail and run

`node index.js --port=yahoo`

When the port is set to `yahoo` the inline images would be displayed,
but if it's changed to `ymail` all the inline images would be broken as the cookies get blocked
by the Safari
