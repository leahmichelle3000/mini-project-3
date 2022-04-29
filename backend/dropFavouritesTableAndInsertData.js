// THIS IS A UTILITY FUNCTION FOR ME TO CLEAR TABLE IF REQUIRED WHILE I DEVELOP THIS APP. IT WILL NOT INTERFERE WITH MY API. 
// IT IS A STANDARD PRACTICE TO HAVE DATABASE SCHEMA FOR DUMMY DATA AND 


import pg from 'pg'
import config from './config.json'

// I am using this file to drop table(i.e. completely delete current table), create new user table, and insert user queries (SQL)
const dropStocksTableQuery = "DROP TABLE IF EXISTS favourites"
// I defined a query to create a table here. Table is feeding through to PG Admin.
const createStocksTableQuery = `CREATE TABLE favourites (
  favourite_id serial PRIMARY KEY,
  stock_id integer NOT NULL,
	user_id integer NOT NULL
)`;
const insertDummyStockQuery = `INSERT INTO favourites (stock_id, user_id) VALUES ('1', '1'), ('1', '2'), ('2', '1')`;

// I use this connection string to connect to my Elephant SQL database
var conString = config.psqlConnectionString //Can be found in the Details page
var client = new pg.Client(conString);

// The function that actually connects to the database is here
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  
  // drop the user table, i.e. delete the current table
  client.query(dropStocksTableQuery, function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }

    // create the new user table
    client.query(createStocksTableQuery, (err, result) => {
        if (err) {
            return console.error('error running query', err);
        }

        // insert the new dummy user
        client.query(insertDummyStockQuery, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            // disconnect from the database
            client.end();
        })
    }) 
  });
});