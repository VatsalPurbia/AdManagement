import express, {  } from 'express';
import { redisServer } from './db/redis';
import dotenv from 'dotenv'
// user 

import userApi from './Router/user/user'
import productsApi from './Router/Products/products'
const app = express();

const port=process.env.PORT;
app.use(express.json())
dotenv.config();

//user
app.use('/user' , userApi)
//products 
app.use('/product' , productsApi)


app.listen(3000, () => {
    redisServer();
    console.log('Server started on port 3000');
});


