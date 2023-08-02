import express, {Request , Response} from 'express'
import { addbid } from '../../Controllers/products/addBid'
import { addProducts } from '../../Controllers/products/addproducts'
import { deleteProduct } from '../../Controllers/products/deleteproduct'
import { getallProducts } from '../../Controllers/products/getallproducts'
import { getUserProduct } from '../../Controllers/products/getUsreporducts'
import { sessionCheck } from '../../middlewears/jwtverify'
import { updateProduct } from '../../Controllers/products/updateproduct'


const router = express.Router()

router.post('/addbid' , sessionCheck , addbid)
router.post('/addProd' , sessionCheck , addProducts)
router.delete('/deleteProd' , sessionCheck , deleteProduct)
router.get('/getallProd' , getallProducts)
router.get('/getuserProducts' ,sessionCheck , getUserProduct)
router.put('/updateProd' , sessionCheck , updateProduct)



export default router
