module.exports = require('express')
  .Router()
  .get('/register', (_, res) => { res.render('register'); })
  .post('/register', (req, res) => {
    console.log(req.url);
    console.log(req.body);
    res.send('router/auth: Registration ok!');
  });
