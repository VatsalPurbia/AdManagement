import { Sequelize , DataType } from "sequelize-typescript";
import exprees , { Request , Response } from "express";


import dotenv from 'dotenv'
dotenv.config();

const sequelize=new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10)
})

sequelize.authenticate().then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error occure in database connection")
})
sequelize.sync().then(()=>{
    console.log("All table are created")
}).catch((err)=>{
    console.log("Error occured table can't created")
})
export default sequelize;
