import { DataType } from "sequelize-typescript";
import sequlizeDB from '../db/connection'
import { userSchema } from "./user";


export const sessionSchema=sequlizeDB.define("session",{
    userId:{
        type:DataType.INTEGER,
        allowNull : false,
        references : { 
            model : userSchema,
            key : "id"
        }
        
    },
    isActive:{
        type:DataType.BOOLEAN
        
    }
})