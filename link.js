
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vidit',
    password: 'awc',
    port: 5432,
})
const fs = require('fs');
var rawdata = fs.readFileSync('config.json');
var student = JSON.parse(rawdata);
var auth = require('basic-auth');

//CHECK AUTHENTICATION OF USER
 function checkUser (name, pass){
  for(var i=0;i<student.users.length;i++)
  {
    if (student.users[i].name==name && student.users[i].pwd==pass)
    {   
        console.log(student.users[i].name+" Exists");
        return true;
    }
  }
      console.log("Check Username and Password")
      return false;
}

//GET USER DETAILS
const getUsers = (request, response) => {
  var credentials = auth(request)
  const vname = credentials.name;
  const vpwd = credentials.pass;

  var userAuth = checkUser(vname,vpwd);

  console.log(userAuth);

  if(userAuth){
  pool.query('SELECT * FROM link', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
else{
  response.status(403).send('WRONG CREDENTIALS');
}
}

//GET USER DETAILS ON BASIS OF ID
const getUserById = (request, response) => {
  var credentials = auth(request)
  const vname = credentials.name;
  const vpwd = credentials.pass;
  var userAuth = checkUser(vname,vpwd);
  console.log(userAuth);
  const id = parseInt(request.params.id)
if(userAuth){
  pool.query('SELECT * FROM link WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
else{
  response.status(403).send('WRONG CREDENTIALS');
}
}

//CREATE NEW USER
const createUser = (request, response) => {
  var credentials = auth(request)
  const vname = credentials.name;
  const vpwd = credentials.pass;
  var userAuth = checkUser(vname,vpwd);
  const { url,name, description } = request.body;
  if(userAuth){
  pool.query('INSERT INTO link (url, name, description) VALUES ($1, $2, $3)', [url, name, description], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
else{
  response.status(403).send('WRONG CREDENTIALS');
}
}

//UPDATE EXISTING USER
const updateUser = (request, response) => {
  var credentials = auth(request)
  const vname = credentials.name;
  const vpwd = credentials.pass;
  var userAuth = checkUser(vname,vpwd);
  console.log(userAuth);
  const id = parseInt(request.params.id)
  const name = request.body.name
if(userAuth){
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
else{
  response.status(403).send('WRONG CREDENTIALS');
}

}

//DELETE EXISTING USER
const deleteUser = (request, response) => {
  var credentials = auth(request)
  const vname = credentials.name;
  const vpwd = credentials.pass;
  var userAuth = checkUser(vname,vpwd);
  console.log(userAuth);
  const id = parseInt(request.params.id)
if(userAuth){
  pool.query('DELETE FROM link WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
else{
  response.status(403).send('WRONG CREDENTIALS');
}
}

//IMPORTING FUNCTIONS TO BE CALLED IN MAINLINK.JS
module.exports = {
  checkUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}