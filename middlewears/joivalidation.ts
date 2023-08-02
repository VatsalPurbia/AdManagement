import express , {Response , Request} from "express"
import Joi, { object } from 'joi'


export const uservalidator  = (req : Request , res : Response , next :  () => void ) =>{
    const userSchema = Joi.object({
        username : Joi.string().required(),
        first_name : Joi.string().required(),
        last_name : Joi.string().required(),
        email : Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password:Joi.string().min(8).required(),
        Mob_number:Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
        gender:Joi.string().equal(...['male','female']).required(),
        DOB:Joi.date().required()
    })
    const result = userSchema.validate(req.body)
    console.log(result.error)
    if(result.error){
        res.status(400).json({error : "Enter valid data "})
    }
    else{
        next()
    }
    
}
export const loginValidator = (req :Request , res : Response , next : ()=>void ) => {
    const loginvalid = Joi.object({
        username : Joi.string().required(),
        password : Joi.string().min(8).max(30).required()
    })
    const result = loginvalid.validate(req.body)
    console.log(result.error)
    if(result.error){
        res.status(400).json({error : "enter valid data"})
    }
    else{
        next()
    }
}