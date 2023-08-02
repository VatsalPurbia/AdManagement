import express, { Request, Response } from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'

export const addbid = async (req: Request, res: Response) => {
    const token = "" + req.headers.authorization
    let decode: any
    try {
        decode = jwt.verify(token, 'secretKey1')
        const { productId, bid } = req.body
        console.log(req.body ,'here --------------------------------' )
        await productSchema.increment(
            { currentPrice: +bid },
            { where: { id: productId } })
        await productSchema.update({ bidderId: decode?.id }, { where: { id: productId } })
        res.status(200).json({message : "Bid successfully added "})
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server error' })
    }
}