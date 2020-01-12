var pg = require('pg');
pg.outFormat = pg.OBJECT;
pg.getConnection(
  {
     user: 'postgres',
  host: 'localhost',
  database: 'vidit',
  password: 'awc',
  port: 5432,
  },
  function(err, connection)
  {
    if (err) { console.error(err); return; }
    console.log("connection established");
    connection.execute(
        
      "SELECT * from link",
      function(err, result)
      {
        if (err) { console.error(err); return; }
        console.log(result.rows);
      });
  });