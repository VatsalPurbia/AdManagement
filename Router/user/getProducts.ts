import express , {Response , Request} from 'express'
import { getallProducts } from '../../Controllers/products/getallproducts'
import { getProduct } from '../../Controllers/products/getUsreporducts'
import { sessionCheck } from '../../middlewears/jwtverify'

const router = express.Router()
router.get('/getUserProducts' , sessionCheck , getProduct)
router.get('/getAllProducts' , getallProducts )
