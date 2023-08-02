import expres, { Response, Request } from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'

export const updateProduct = async (req: Request, res: Response) => {
    const token = "" + req.headers.authorization
    let decode: any
    try {
        decode = jwt.verify(token, 'secretKey1')
        const UpdatedData = await productSchema.update({
            porduct_name: req.body.product_name,
            description: req.body.description, basePrice: req.body.basePrice, title: req.body.title
        }, { where: { userId: decode?.id } })
        if (!UpdatedData) {
            res.status(400).json({ error: "Product not found" })
        }
        else {
            res.status(201).json({ message: "Product Updated successfully", UpdatedData })
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}