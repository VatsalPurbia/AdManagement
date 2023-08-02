import { DataType, Model } from "sequelize-typescript";
import sequelizedb from "../db/connection";



export const userSchema=sequelizedb.define('users',{
    username:{
        type:DataType.STRING
    },
    first_name:{
        type:DataType.STRING
    },
    last_name:{
        type:DataType.STRING
    },
    email:{
        type:DataType.STRING
    },
    password:{
        type:DataType.STRING
    },
    profile:{
        type:DataType.BLOB,
        defaultValue:null
    },
    Mob_number:{
        type:DataType.BIGINT
    },
    gender:{
        type:DataType.STRING
    },
    DOB:{
        type:DataType.DATEONLY//store data in format 1990-01-15
    }
})
  