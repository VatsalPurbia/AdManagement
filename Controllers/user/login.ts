import { Request, Response } from 'express'
import { userSchema } from '../../Model/user'
import redisclient from '../../db/redis'
import { sessionSchema } from '../../Model/session'
import { Op, json } from 'sequelize'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const login = async (req: Request, res: Response) => {
    let token: string = ""
    // const {username , password } = req.body
    let data = await userSchema.findOne({
        where: {
            [Op.and]: [
                { username: req.body?.username },
                { password: req.body?.password }
            ]
        }
    })
    
    console.log(data)
    let userdata = JSON.parse(JSON.stringify(data))
    token = jwt.sign({ id: userdata.id }, 'secretKey1', { expiresIn: '1h' })
    if (userdata) {
        let redisresponse = await redisclient.get(`${userdata.id}`)
        console.log(redisresponse)
        if (redisresponse == null) {
            console.log('miss')
            let isActiveSession = await sessionSchema.findOne({
                where: {
                    [Op.and]: [
                        { userId: userdata.id },
                        { isActive: true }
                    ]
                }
            })
            if (JSON.parse(JSON.stringify(isActiveSession)) == null) {
                sessionSchema.create({
                    userId: userdata.id,
                    isActive: true
                })
                redisclient.setEx(`${userdata.id}`, 3500, 'true')
            }
            else {
                redisclient.setEx(`${userdata.id}`, 3500, 'true')
            }
            res.status(201).send(token)
        }
        else {
            console.log('cache hit');
            res.status(201).send(token)

        }

    }
    else {
        return res.status(401).json({ error: "Please register yourself first " })


    }


}
