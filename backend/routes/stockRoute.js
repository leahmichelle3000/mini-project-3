// I got this from yahoofinanceapi.com
// Axios seems to be more commonly used than in the real world
'use strict'
import favouriteMethods from '../db_methods/favourites.js';

// MINI PROJECT 3 - store the API data in the database mongo DB or postgres or elephant SQL
// GO TO: https://www.npmjs.com/package/postgres
import axios from "axios"
import express  from 'express'
const router = express.Router();
import cors  from 'cors'
const app  = express();
app.use(cors());
// // I created this object to call my API Key, keeping it in a separate file for security
import yahooConfig from "../config.json";
import pg from 'pg'
import config from '../config.json'

// I am using this file to drop table (i.e. completely delete current table), create new user table, and insert user queries (SQL)
const dropStocksTableQuery = "DROP TABLE IF EXISTS stocks"
const createStocksTableQuery = `CREATE TABLE stocks (
    stock_id serial PRIMARY KEY,
    symbol VARCHAR ( 50 ) UNIQUE NOT NULL,
    price FLOAT ( 50 ) NOT NULL
)`;

router.get('/mamaastocks', (req, res) => {

   axios({
  method: 'GET', //you can set what request you want to be
  url: 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=AAPL%2CAMZN%2CGOOG%2CFB%2CMSFT%2CNAB.AX',
    params: {modules: 'defaultKeyStatistics,assetProfile'},
  headers: {
       // Below, I am accessing an object called yahooConfig and the property within called yahooApiKey
    'x-api-key': yahooConfig.yahooApiKey
    // Authorization: 'Bearer ' + varToken
  }
  // as axios is a promise-based package, we need to use a then
})
.then((result) => {
  console.log(result.data.quoteResponse.result)
  const results = result.data.quoteResponse.result
      // /// Save stock result into DB - need to use this over in dropStocksTable...

// START

// another try - GOOGLE THIS: query to insert nested array postgres node js

const insertDynamicStockQuery = `INSERT INTO stocks (symbol, price) VALUES 
  ('${results[0].symbol}', '${results[0].regularMarketPrice}'), 
  ('${results[1].symbol}', '${results[1].regularMarketPrice}'), 
  ('${results[2].symbol}', '${results[2].regularMarketPrice}'),
  ('${results[3].symbol}', '${results[3].regularMarketPrice}'),
  ('${results[4].symbol}', '${results[4].regularMarketPrice}'),
  ('${results[5].symbol}', '${results[5].regularMarketPrice}')`;
console.log(insertDynamicStockQuery)
// (result.query.quote[0].symbol, result.query.quote[0].price)

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

        // insert the new dynamic stock
        client.query(insertDynamicStockQuery, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            // disconnect from the database
            client.end();
        })
      })

    })
  //   }) 
  // });
});
/// ENDS
      
      // insertStock (result.data[0].symbol, result.data[0].price)

  // to do - this is where I need to store the data to the DB
  res.send(result.data);
  // console.log('yahoo'+res);
})
});

router.post('/favourite', async (req, res) => {
  if (!req.body.stock_id || !req.body.user_id) {
    res.status(400);
    res.send('Must provide user_id and stock_id');
    return
  }

  await favouriteMethods.insertFavourite(req.body.stock_id, req.body.user_id)
  res.status(200)
})


export default router

//router.get('/testmain',(req,res)=>{res.json({message:'test'});});
