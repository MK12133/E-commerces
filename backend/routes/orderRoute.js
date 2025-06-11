import express from  "express"
import {placeOrder,allOrders,userOrders,updateStatus,placeOrderStripe,verifyStripe} from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,authUser,placeOrderStripe)


orderRouter.post('/userorders',authUser,userOrders)


orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter