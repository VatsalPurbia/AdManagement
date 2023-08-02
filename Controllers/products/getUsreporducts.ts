import express, {Request , Response } from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'
import { userSchema } from '../../Model/user'

export const getProduct =async (req : Request , res : Response) => {
    const token = ""+req.headers.authorization
    let  decode : any 
    try {

       decode= jwt.verify(token , 'secretKey1')
       const productData = await productSchema.findOne( {where : {userId : decode?.id}})
    //    console.log(productData , '-----------here-------------')
       JSON.parse(JSON.stringify(productData))
       if(productData){
        console.log(productData)
        res.status(200).json({ message: 'Successfully found the Product Data', productData });
       }
       else {
        res.status(404).json({message : "Product not found in the DataBase"})
       }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the product data' });
    }


}