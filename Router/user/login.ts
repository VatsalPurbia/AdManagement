import express from 'express'
import { login } from '../../Controllers/user/login'
import { loginValidator } from '../../middlewears/joivalidation'


const router = express.Router()

router.post('/login' , loginValidator , login)

export default router