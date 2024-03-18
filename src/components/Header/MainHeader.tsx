import React from "react";
import { useShoppingCart } from "../../store/ShoppingCartContext.tsx";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { state } = useShoppingCart();

  const totalCount = state.items.reduce(
      (total: number, item: { quantity: number; }) => total + item.quantity,
      0
  );
  return (
      <div className="bg-gray-300 text-white p-4 fixed w-full top-0 z-20">
        <header className="bg-gray-300 text-white p-4 flex items-center justify-between  md:flex-row flex-col ">
          <div className="flex items-center text-black">
            <i className="fa-regular fa-circle-user fa-xl mr-2 text-black"></i>
            <Link to="/users/1">Hi, John</Link>
          </div>

          <div className="flex items-center md:flex-row flex-col md:mt-0 mt-4">
            <Link to="/" className="text-xl font-bold">
              <img src="/hr-logo-hk.png" alt="Site Logo" className="h-8" />
            </Link>
          </div>

          <div className="flex items-center md:flex-row flex-col relative text-black md:mt-0 mt-4">
            <Link to="/cart" className="mr-4 flex items-center">
              Cart
              {totalCount >= 0 && (
                  <div className="ml-2 h-5 w-6 bg-red-500 text-white flex items-center justify-center rounded-full">
                    <span className="cart-count">{totalCount}</span>
                  </div>
              )}
            </Link>
          </div>
        </header>
      </div>
  );
};

export default Header;
