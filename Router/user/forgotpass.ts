import express , {Request , Response} from 'express'
import { sessionCheck } from '../../middlewears/jwtverify'   
import { sendOtp } from '../../middlewears/sendotp'
import { changePass } from '../../Controllers/user/forgotPassword'

const router = express.Router()
router.post(('/sendotp') , sessionCheck , sendOtp)
router.post(('/forgotpass') , sessionCheck  , changePass)

export default router