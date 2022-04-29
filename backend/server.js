import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import stockRoute from './routes/stockRoute.js';
import bodyParser from 'body-parser'
import express from 'express'

const app = express()


//APP.USE LINES
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors())

const port = 3003

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// app.use('/socialmedia', socialRoute);
app.use('/user', userRoute);
// trying to bring in stockRoute
// main route is localhost address/stock

//main route is stock and subRoute is what is defined in stockRoute
app.use('/stock', stockRoute);


app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`)
    console.log(`Documentation located at https://localhost:${port}/api-docs`)
})