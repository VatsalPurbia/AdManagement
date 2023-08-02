import { Response, Request } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { userSchema } from '../../Model/user'



export const addpic = async (req: Request, res: Response) => {

    try {
        console.log(req.file,'-===-==-=--==--==---==--=');
        
        const token = ""+req.headers.authorization
        console.log(token,'-------------_____TOIKEJDN_______________---------')
        const decoded: any = jwt.verify(token, 'secretKey1')
        console.log(decoded,req.body.filename,'---------HERERERERERRERRRRRRRRRRRRR-----------------')
        const picture = fs.readFileSync(`./uploads/${req.body.filename}`)
         await userSchema.update({ profile: picture }, { where: { id: decoded.id } })
        res.status(200).json({ message: "successfully uploaded " })
        fs.unlink(`./uplaods/${req.body.filename}`, (err) => {
            if (err) {
                throw err
            }
            else {
                console.log('File Deleted')
            }
    })
    } catch (error) {

        res.status(404).send(error)
    }




}