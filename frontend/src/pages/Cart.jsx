import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-10 bg-gray-50 min-h-screen transition-all">
      <div className="mb-10 text-3xl font-bold text-center text-gray-800">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-gray-500 animate-fadeIn">
          <p className="text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartData.map((item, index) => {
            const product = products.find(p => p._id === item._id);
            return (
              <div
                key={index}
                className="bg-white border shadow-sm rounded-xl p-4 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-4 items-center animate-fadeIn"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md shadow"
                  />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-800">{product.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm sm:text-base text-gray-600">
                      <span className="font-semibold">{currency}{product.price}</span>
                      <span className="px-2 py-1 bg-gray-100 border rounded-md">{item.size}</span>
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 w-16 sm:w-20 text-center focus:outline-none focus:ring-2 focus:ring-black transition"
                />

                <div className="flex justify-start sm:justify-end">
                  <img
                    src={assets.bin_icon}
                    alt="Remove"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-5 sm:w-6 cursor-pointer transition-transform hover:scale-110"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end pt-16 transition-opacity">
          <div className="w-full sm:w-[400px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="mt-8 bg-black cursor-pointer text-white rounded-full px-8 py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-transform hover:scale-105"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
