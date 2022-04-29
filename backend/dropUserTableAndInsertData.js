import pg from 'pg'
import config from './config.json'

// I am using this file to drop table(i.e. completely delete current table), create new user table, and insert user queries (SQL)
const dropUserTableQuery = "DROP TABLE users"
const createUserTableQuery = `CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 255 ) NOT NULL
)`;
// const insertDummyUserQuery = `INSERT INTO users (username, password) VALUES ('gwenbaker', 'turtle'), ('niko', 'swordfish')`;

const insertDynamicUserQuery = `INSERT INTO users (username, email) VALUES ('${username}', '${password}')`
// I use this connection string to connect to my Elephant SQL database
var conString = config.psqlConnectionString //Can be found in the Details page
var client = new pg.Client(conString);

// The function that actually connects to the database is here
client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  
  // drop the user table, i.e. delete the current table
  client.query(dropUserTableQuery, function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }

    // create the new user table
    client.query(createUserTableQuery, (err, result) => {
        if (err) {
            return console.error('error running query', err);
        }

        // insert the new dummy user
        client.query(insertDynamicUserQuery, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            // disconnect from the database
            client.end();
        })
    }) 
  });
});
