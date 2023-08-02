import express, {Request , Response } from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'


export const getallProducts =async (req: Request , res : Response) => {
 try  {  const data = await productSchema.findAll();
    res.status(200).json({message : "All Products Found successfully" , data})
}
catch(error){
    res.status(500).json({error : "Internal server error"})
}}
