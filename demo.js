const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vidit',
  password: 'awc',
  port: 5432,
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const db = require('./node_modules')
const port = 3000

const getUsers = (request, response) => {
  pool.query('SELECT * FROM link', (error, results) => {
    if (error) {
      console.error(error)
      throw error
    }
    console.log("Vidit")
    response.status(200).json(results.rows)
    console.log("Verma")
    console.log(results.rows);
  })
}

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', getUsers)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = {
  getUsers,
 // getUserById,
 // createUser,
 // updateUser,
 // deleteUser,
}