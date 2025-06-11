import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { navigate, backendURL, token, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[navigate, token])
  
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] bg-gray-800 w-8" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border w-full px-3 py-2 border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border w-full px-3 py-2 border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="border w-full px-3 py-2 border-gray-800"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:underline">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className=" hover:underline cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="hover:underline cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button
        className="px-10 cursor-pointer py-2 text-white bg-black text-sm rounded-full mt-4" type="submit">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
