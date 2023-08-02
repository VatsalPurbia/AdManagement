import express, { Response, Request } from 'express'
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { userSchema } from '../../Model/user';
import redisClient from '../../db/redis';
import { decode } from 'punycode';
import jwt from 'jsonwebtoken'



export const changePass = async (req: Request, res: Response) => {
  const token = "" + req.headers.authorization
  let decode: any

  try {
    decode = jwt.verify(token, 'secretKey1')
    const otp =await redisClient.get(`OTP${decode.id}`)
    const { OTP, newPassword } = req.body;
    console.log(otp,OTP,newPassword)
    if (otp == OTP) {
       await userSchema.update({ password: newPassword }, { where: {id : decode?.id} })
      res.status(201).json({message : 'Otp verified and password is changed'})
    }
    else {
      res.status(400).json({error : 'otp not valid or expired'})
    }


  }
  catch(error){
    res.status(500).json({error : "Internal server error"})
  }
  
};