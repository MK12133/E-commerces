import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency,backendURL,token } = useContext(ShopContext);
  const [orderData,setOrderData] = useState([])

  const fetchOrder = async() => {
    try {
      if(!token){
        return null
      }
    const res = await axios.post(backendURL+'/api/order/userorders',{},{headers:{token}})
    if(res.data.success){
      let allOrdersItem = []
      res.data.orders.map((order)=>{
        order.items.map((item)=>{
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          item['date'] = order.date
          allOrdersItem.push(item)
        })
      })
      setOrderData(allOrdersItem.reverse())
    }
    } catch (error) {
      console.log(error);
      toast.error({success:false,messgae:error.messgae})
    }
  }

  useEffect(()=>{
    fetchOrder()
  },[token])

  return (
    <div className="border-t pt-16 px-4 md:px-8">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="flex gap-4 items-start">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</p>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">{currency}{item.price}</span>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>{item.status}</p>
              </div>
              <button onClick={fetchOrder} className="border border-gray-300 cursor-pointer hover:border-gray-500 px-4 py-2 rounded-md text-sm font-medium transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
