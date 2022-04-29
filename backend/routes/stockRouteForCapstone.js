// I got this from yahoofinanceapi.com
// Axios seems to be more commonly used than in the real world
'use strict'
import favouriteMethods from '../db_methods/favourites.js';

//TO DO - store the API data in the database mongo DB or postgres or elephant SQL
// GO TO: https://www.npmjs.com/package/postgres
import axios from "axios"
import express  from 'express'
const router = express.Router();
import cors  from 'cors'
const app  = express();
app.use(cors());
// // I created this object to call my API Key, keeping it in a separate file for security
import yahooConfig from "../config.json";

// Ask Ali  - I moved my axios GET Request into this function, experimenting - I think something is wrong with this. I also hadnt defined res
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

    res.send(result.data);
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
