import { DataType, Model } from "sequelize-typescript";
import sequelizedb from "../db/connection";
import { userSchema } from "./user";

export const addressSchema = sequelizedb.define("address" , {
    houseNumber : {
        type : DataType.STRING
    },
    streetNumber : {
        type : DataType.INTEGER
    },
    area :{
        type : DataType.STRING
    },
    landMark : {
        type : DataType.STRING
    },
    city : {
        type : DataType.STRING
    },
    country : {
        type : DataType.STRING
    },
    zipCode : {
        type : DataType.INTEGER
    },
    state : {
        type : DataType.STRING
    },
    userId : {
        type : DataType.INTEGER,
        allowNull : false ,
        references:{
            model : userSchema,
            key : 'id'
        }
    }
})