import express , {Request , Response} from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'

export const deleteProduct =async (req : Request , res : Response) => {
    const token = ""+req.headers.authorization
    let decode : any 
    try {
        decode = jwt.verify(token , 'secretKey1')
        const data = await productSchema.findOne({where : {userId : decode?.id}})
        JSON.parse(JSON.stringify(data))
        if(data){
             await data.destroy()
           res.status(200).json({message  : "Deleted product successfully "})
        }
        else{
            res.status(404).json({error  : "Product not found"})
        }
       
        
    }
    catch(error){
        res.status(500).json({error : "An error occured while fetching the prodcut data  "})
    }    

}
