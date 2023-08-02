import express, { Request, Response } from "express";
import { userSchema } from "../../Model/user";
import sequelizedb from '../../db/connection'
import jwt from 'jsonwebtoken'
export const updateUser = async (req: Request, res: Response) => {
    const token = "" + req.headers.authorization
    let decode: any
    try {
        decode = jwt.verify(token, 'secretKey1')
        const updatedUser = await userSchema.update({
            username: req.body.username, first_name: req.body.first_name,
            last_name: req.body.last_name, email: req.body.email, Mob_number: req.body.Mob_number
        }, { where: { id: decode?.id } })
        JSON.parse(JSON.stringify(updatedUser))
        if (!updateUser) {
            res.status(404).json({ error: "user not found" })

        }
        else {
            res.status(201).json({ message: "User Updated" })
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}