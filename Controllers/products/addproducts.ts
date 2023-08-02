import { productSchema } from '../../Model/Product'
import express, { Response, Request } from 'express'
import jwt from 'jsonwebtoken'

export const addProducts = async (req: Request, res: Response) => {
    // const  {porduct_name , description , images , basePrice, title , userId } = req.body 
   
    const token = ""+req.headers.authorization
    let decode : any
    try {

        decode = jwt.verify(token , 'secretKey1')
        console.log('')
        const newproduct = await productSchema.create({
            product_name: req.body.product_name,
            description: req.body.description,
            images: req.body.images,
            basePrice: req.body.basePrice,
            currentPrice : req.body.currentPrice,
            title: req.body.title,
            categorie : req.body.categorie,
            userId: decode?.id,
            bidderId : decode?.id
        })
        console.log("Product is Added Successfully")
        res.status(200).json({ message: "Product Added Successfully" })
        // res.redirect('/home')
    }
    catch (error) {
        throw error

    }
}