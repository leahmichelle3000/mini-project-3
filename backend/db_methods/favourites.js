import pg from 'pg'
import config from "../config.json";
var conString = config.psqlConnectionString //Can be found in the Details pagee

// SELECT 
// 	stocks.symbol as symbol,
// 	users.username as username,
// 	stocks.price as price
// FROM stocks
// JOIN favourites ON favourites.stock_id=stocks.stock_id
// JOIN users ON users.user_id=favourites.user_id;
// WHERE users.username = 'niko';

const insertFavourite = (stock_id, user_id) => new Promise((resolve, reject) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
      if (err) {
        return console.error('could not connect to postgres', err);
        reject(err)
      }
      const insertUserQuery = `INSERT INTO favourites (stock_id, user_id) 
                              VALUES ('${stock_id}', '${user_id}')`
      client.query(insertUserQuery, function(err, result) {
        if (err) {
          return console.error('error running query', err);
          reject(err)
        }
        console.log(result);
        resolve()
        client.end();
      });
    });
})


export default { insertFavourite };
