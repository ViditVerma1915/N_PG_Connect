const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vidit',
    password: 'awc',
    port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM link', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM link WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { url,name, description } = request.body;
 // var xyz = request.body.xyz;
  //var abc = request.body.abc;

 // console.log("out puts"+xyz+ " , "+abc);
  pool.query('INSERT INTO link (url, name, description) VALUES ($1, $2, $3)', [url, name, description], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const name = request.body.name
  console.log("id---"+id)
  console.log("name----"+name)
console.log("Request Body Name----"+request.body.name);

  pool.query(
    'UPDATE link SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM link WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}