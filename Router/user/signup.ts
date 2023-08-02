import express from "express"
import {signUpController} from "../../Controllers/user/signup"
import {uservalidator} from "../../middlewears/joivalidation"

const router = express.Router()

router.post('/signup' , uservalidator , signUpController)

export default router