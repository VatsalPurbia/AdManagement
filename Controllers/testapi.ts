import express, {Response , Request} from 'express'

export const testapi =async (req : Request , res : Response) => {

    const { name , emal } = req.body
    console.log(JSON.parse(JSON.stringify(req.body)))
}   