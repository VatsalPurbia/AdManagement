import express , {Response , Request}from 'express'
import { addressSchema } from '../../Model/address'
import jwt from 'jsonwebtoken'
export const addAddress  = async (req : Request , res : Response) => {
    const token = ""+req.headers.authorization
    let decode : any 
    try {
        decode : jwt.verify(token , 'secretKey1')
        const data = addressSchema.create({
            houseNumber : req.body.houseNumber,
            streetNumber : req.body.streetNumber,
            area : req.body.area,
            landMark : req.body.landMark,
            city : req.body.city,
            country : req.body.country,
            zipCode : req.body.zipCode,
            state : req.body.state,
            userId : decode?.id
        }) 
        res.status(200).json({message : 'Address Succsessfully added'})
   }
   catch (error){
    res.status(500).json({error : "Internal server error"})
   }
    
}