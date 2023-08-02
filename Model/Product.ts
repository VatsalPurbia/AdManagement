import { DataType, Model } from "sequelize-typescript";
import sequelizedb from "../db/connection";
import { userSchema } from "./user";
import { IntegerDataType } from "sequelize";

// interface ProductInstance extends Model {
//     product_name: string;
//     description: string;
//     images : Blob;
//     basePrice : number;
//     title : string;

//     // Add other properties here based on your model definition
//   }


export const productSchema = sequelizedb.define('products',{  
    product_name: {
        type : DataType.STRING
    },
    description :{
        type : DataType.STRING
    },
    images : {
        type : DataType.BLOB("long")
    },
    basePrice : {
        type : DataType.INTEGER
    },
    currentPrice : {
        type : DataType.INTEGER
    },
    title : {
        type : DataType.STRING
    },
    categorie :{
        type : DataType.STRING,
        allowNull : false,
    },
    userId :  {
        type : DataType.INTEGER,
        allowNull : false , 
        references : {
            model : userSchema,
            key : 'id'

        }       
    },
    bidderId : {
        type : DataType.INTEGER,
        allowNull : false ,
        references : {
            model : userSchema,
            key : 'id'
        }
    }


})