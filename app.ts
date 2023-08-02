import express, { Response, Request } from 'express';
import { Sequelize, Op, Model, DataTypes } from "sequelize"
import { redisServer } from './db/redis';
import { testapi } from './Controllers/testapi';
import { updateProduct } from './Controllers/products/updateproduct';
import dotenv from 'dotenv'
// user 
import { getallProducts } from './Controllers/products/getallproducts';
import addProfilePic from './Router/user/porfilepic'
import login from './Router/user/login'
import signup from './Router/user/signup'
import { addProducts } from './Controllers/products/addproducts';
// import { getProduct } from './Controllers/products/getUsreporducts';
import forgotpass from './Router/user/forgotpass'
import { addbid } from './Controllers/products/addBid';
const app = express();

const port=process.env.PORT;
app.use(express.json())
dotenv.config();
// app.post('/updateProduct' , updateProduct)
// app.post('/addproduct' ,addProducts)
// app.get('/getproduct', getProduct)
// app.post('/addbid' , addbid )
// app.get('/getallprod' , getallProducts)

// app.post('/testapi' , testapi)
app.use('/user' , addProfilePic)
app.use('/user' , forgotpass)
app.use('/user' , signup)
app.use('/user' , login )


app.listen(3000, () => {
    redisServer();
    console.log('Server started on port 3000');
});


