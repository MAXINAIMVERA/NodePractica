const express = require('express')

const router = express.Router()

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/', (req, res) => {
    res.render('index')
  })

module.exports = router