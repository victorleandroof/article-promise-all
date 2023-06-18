const express  = require('express');
const promisesAll =  require('./promises-all');

const app = express();

app.get('/with/promises-all', promisesAll.withPromisesAll);
app.get('/without/promises-all', promisesAll.withoutPromisesAll);

app.listen(parseInt(process.env.PORT), () => {
    console.log(`init server on ${process.env.PORT}`);
});