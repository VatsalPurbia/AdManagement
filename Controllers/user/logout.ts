import jwt from 'jsonwebtoken'
import { Request,Response } from 'express'
import { sessionSchema } from '../../Model/session';
import redisclient from '../../db/redis'
export async function logoutController (req:Request,res:Response){
    try{
        let token:string=""+req.headers.authorization;
        let decode= JSON.parse(JSON.stringify(jwt.verify(token,'secretKey1')))
        const data = await sessionSchema.update({isActive : false}, {where:{userId : decode.id}})
        redisclient.del(`${decode.id}`)
    }catch(error){
        res.status(400).send("Internal Server Error")
    }
}

