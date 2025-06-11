import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const {navigate,token,  setCartItems, backendURL} = useContext(ShopContext)
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async() => {
        try {
            if(!token){
                return null
            }
            const res = await axios.post(backendURL+'/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if(res.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
    
  return (
    <div>

    </div>
  )
}

export default Verify