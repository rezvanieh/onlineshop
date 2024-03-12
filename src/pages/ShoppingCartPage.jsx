import React from "react";
import { useShoppingCart } from "../store/ShoppingCartContext.jsx";

const ShoppingCartPage = () => {
  const { state, dispatch, increaseQuantity } = useShoppingCart();

  const calculateTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });
  };

  return (
    <div className=" container mx-auto  px-4 ">
      <div className="overflow-auto ">
        <table className="mt-14 md:mt-2  text-sm md:text-l min-w-full border border-gray-700 ">
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="hidden md:table-cell border p-2">#</th>
              <th className="border p-2 ">Title</th>
              <th className="hidden md:table-cell border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} `}
              >
                <td className="hidden md:table-cell border p-2">{index + 1}</td>
                <td className="border p-2 font-normal md:font-bold">
                  {item.title}
                </td>
                <td className="hidden md:table-cell border p-2">
                  {item.description}
                </td>
                <td className="p-2 flex items-center space-x-2 mt-10 md:mt-0">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>
                    <i class="fa-solid fa-circle-minus text-blue-900"></i>
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>
                    <i class="fa-solid fa-circle-plus text-red-900"></i>
                  </button>
                </td>
                <td className="border p-2">${item.price.toFixed(2)}</td>
                <td className="border p-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full justify-end bg-gray-200">
          <div className="border p-2 font-bold "> Total Price:</div>
          <div className="border font-bold p-2 justify-center">
            ${calculateTotalPrice().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
