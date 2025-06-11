import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const {
    products,
    getCartAmount,
    delivery_fee,
    cartItems,
    navigate,
    backendURL,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //API call for cod
        case "cod":
          const res = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(res.data);

          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        case "stripe":
          const resStripe = await axios.post(
            backendURL + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            value={formData.firstName}
            onChange={onChangeHandler}
            name="firstName"
            placeholder="First name"
            required
          />
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          required
        />
        <input
          className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={formData.street}
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zipcode"
            required
          />
          <input
            className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
            type="text"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />
        </div>
        <input
          className="border px-3.5 py-1.5 border-gray-300 rounded w-full"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border rounded-full p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "stripe" ? "bg-green-400" : ""
                } `}
              />
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border rounded-full p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method == "cod" ? "bg-green-400" : ""
                }`}
              />
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white rounded-full px-16 py-3 text-sm cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
