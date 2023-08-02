import { Request, Response } from "express";
import {userSchema} from "../../Model/user";
import sequelizedb from '../../db/connection'
import {Op} from 'sequelize'


export const signUpController=async (req:Request,res:Response)=>{
    try{
        if(req.body==undefined)
        {
            res.status(404).send("User Not Found")
        }else{
            if(!(await isExist(req))){
                console.log("Inserting data in database")
                const data= await userSchema.create(
                    {
                        username:req.body.username,
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        email:req.body.email,
                        password:req.body.password,
                        Mob_number:req.body.number,
                        gender:req.body.gender,
                        DOB:req.body.DOB
                    }
                )
                console.log("User Registered",data)
                res.status(201).send("Register Successfully")
            }else{
                res.status(400).send("User Already Exist")
            }
        }
    }catch(error){
        res.send(error)
    }
}

const isExist=async (req:Request)=>{  
    let data:any
    try{
        data =await userSchema.findAll({
        where:{
                [Op.and]: [
                  { username: req.body?.username },
                  { password: req.body?.password }
                ]      
            }
    })
    if(Object.keys(data).length>0){
        console.log("true")
        return true
    }
    }catch(err){
        console.log("Some error occure")
    }
    console.log("false")
    return false
}