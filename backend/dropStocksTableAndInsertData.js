import pg from 'pg'
import config from './config.json'

// I am using this file to drop table(i.e. completely delete current table), create new user table, and insert user queries (SQL)
const dropStocksTableQuery = "DROP TABLE IF EXISTS stocks"
const createStocksTableQuery = `CREATE TABLE stocks (
    stock_id serial PRIMARY KEY,
    symbol VARCHAR ( 50 ) UNIQUE NOT NULL,
    price FLOAT ( 50 ) NOT NULL
)`;
const insertDummyStockQuery = `INSERT INTO stocks (symbol, price) VALUES ('AAPL', '156.80'), ('AMZN', '2787.82')`;

// const insertDynamicStockQuery = (result.data[0].symbol, result.data[0].price)

// another try - GOOGLE THIS: query to insert nested arrayy postgres node js

// const insertDynamicStockQuery = `INSERT INTO stocks (symbol, price) VALUES (${data.query.result.quote[0].symbol}, ${data.query.result.quote[0].price}), (${data.query.result.quote[1].symbol}, ${data.query.result.quote[1].price})`;

console.log(insertDynamicStockQuery)
(data.query.result.quote[0].symbol, data.query.result.quote[0].price)

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

    // create the new stock table
    client.query(createStocksTableQuery, (err, result) => {
        if (err) {
            return console.error('error running query', err);
        }

        // insert the new dummy stock
        client.query(insertDynamicStockQuery, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            // disconnect from the database
            client.end();
        })
    }) 
  });
});