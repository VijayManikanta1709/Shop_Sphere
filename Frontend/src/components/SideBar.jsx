import { Link } from 'react-router-dom'
import React, { useContext } from 'react'

import CartItem from './CartItem.jsx'
import { SideBarContext } from '../context/SideBarContext.jsx'
import { CartContext } from '../context/CartContext.jsx'

function SideBar() {
  const { isOpen, handleClose } = useContext(SideBarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  const handleOrder = () => {
  const confirmed = window.confirm(
    `Your total amount is ₹${total}. Do you want to confirm this order?`
  );

  if (confirmed) {
    alert("Order placed! Delivered within 7 working days.");
    clearCart();
  }
};



  return (
    <div
      className={`${isOpen ? 'right-0' : '-right-full'}
      fixed top-0 h-full w-full bg-white shadow-2xl
      sm:max-w-[80vw] md:max-w-[50vw] lg:max-w-[38vw] xl:max-w-[30vw]
      transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col`}
    >
      {/* header */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold d-flex align-items-center gap-2">
          Shopping Bag
          <span
            className="rounded-circle d-flex align-items-center justify-content-center text-white"
            style={{
              background: "#FF6900",
              width: "22px",
              height: "22px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {itemAmount}
          </span>
        </div>

        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <i className="bi bi-arrow-bar-right text-[25px]"></i>
        </div>
      </div>

      {/* scrollable items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden border-b mt-2 mb-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      {/* bottom total + buttons */}
      <div className="flex flex-col gap-y-3 py-4 px-2 rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 uppercase font-semibold">
            <span>Total :</span> <i className="bi bi-currency-rupee"></i>  {Math.max(0, total - 100)}
          </div>

          <div
            style={{
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
            className="cursor-pointer bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            onClick={clearCart}
          >
            <i className="bi bi-trash3-fill"></i>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-2">
          <Link
            to="/"
            className="bg-gray-200 px-4 py-2  w-full text-center font-semibold"
            style={{ textDecoration: 'none', color: "black" }}
          >
            View Cart
          </Link>

          <div onClick={handleOrder}

            className="bg-orange-500 text-white px-4 py-2  w-full text-center font-semibold"
            style={{ textDecoration: 'none' }}
          >
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
