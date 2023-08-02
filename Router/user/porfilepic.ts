import express , { Response , Request } from 'express'
import { sessionCheck } from '../../middlewears/jwtverify'
import { upload } from '../../middlewears/multerfileUpload'
import { addpic } from '../../Controllers/user/addpic'

const router = express.Router()

router.post('/profile_pic' , sessionCheck  , upload , addpic)

export default router