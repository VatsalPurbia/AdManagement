import express from "express"
import {signUpController} from "../../Controllers/user/signup"
import {loginValidator, uservalidator} from "../../middlewears/joivalidation"
import { sessionCheck } from "../../middlewears/jwtverify"
import { sendOtp } from "../../middlewears/sendotp"
import { changePass } from "../../Controllers/user/forgotPassword"
import { login } from "../../Controllers/user/login"
import { upload } from "../../middlewears/multerfileUpload"
import { addpic } from "../../Controllers/user/addpic"
import { updateUser } from "../../Controllers/user/updateuser"
import { addAddress } from "../../Controllers/user/addAddress"

const router = express.Router()

router.post('/signup' , uservalidator , signUpController)
router.post('/sendotp' , sessionCheck , sendOtp)
router.post('/forgotpass' , sessionCheck  , changePass)
router.post('/addAdress' ,sessionCheck , addAddress)
router.post('/login' , loginValidator , login)
router.post('/profile_pic' , sessionCheck  , upload , addpic)
router.put('/updateUser' , sessionCheck, updateUser )


export default router