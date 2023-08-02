import { sessionSchema } from "../Model/session"
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { client } from '../db/redis' 
import { Op } from "sequelize"


export const sessionCheck = async (req: Request, res: Response, next: () => void) => {

    const token = "" + req.headers.authorization

    let decoded: any


    try {
        decoded  = jwt.verify(token , 'secretKey1')
        let redisresponse = await client.get(`${decoded.id}`)
        console.log(redisresponse,'edddddddddddddddddddddddddddddddddddddddddddddddddddw')
        if (redisresponse == null) {
            console.log('miss')
            let isActiveSession = await sessionSchema.findOne({
                where: {
                    [Op.and]: [
                        { userId: decoded?.id },
                        { isActive: true }
                    ]
                }
            })
            isActiveSession = JSON.parse(JSON.stringify(isActiveSession))
            if (isActiveSession) { 
                client.setEx(`${decoded.id}`, 3600, 'true')              
                }
            }
            else {
            next()

                // res.send("Authentication Error ")
            }
        }

    catch (error) {
        res.send(error)

    }

}

