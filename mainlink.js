const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./link')
const port = 3000

var auth = require('basic-auth');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsers) //GET USER DETAILS

app.get('/users/:id', db.getUserById) //GET USER DETAILS ON BASIS OF ID

app.post('/users', db.createUser) //CREATE NEW USER

app.put('/users/:id', db.updateUser) //UPDATE EXISTING USER

app.delete('/users/:id', db.deleteUser) //DELETE EXISTING USER

app.listen(port, () => {
  console.log(`App running on port ${port}.`) //3000
})