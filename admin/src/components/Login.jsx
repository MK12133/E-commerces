import React, { useState } from 'react';
import axios from "axios"
import {backendURL} from "../App"
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            const res = await axios.post(backendURL+'/api/user/admin',{email,password})
            if(res.data.success){
                setToken(res.data.token)
            }else{
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(error);
             toast.error(error.message)
        }
    }

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      <div className="relative z-20 backdrop-blur-md border-opacity-20 rounded-2xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login To Admin Panel</h2>
        <form onSubmit={onSubmitHandler} >
          <div className="mb-4">
            <p>Email</p>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 shadow rounded bg-transparent bg-opacity-10 placeholder-white text-white focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
          </div>
          <div className="mb-6">
            <p>Password</p>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 rounded bg-transparent shadow bg-opacity-10 placeholder-white text-white focus:outline-none focus:ring-1 focus:ring-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full cursor-pointer py-2 bg-purple-500 hover:bg-purple-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
