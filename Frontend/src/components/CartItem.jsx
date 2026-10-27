import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {CartContext} from '../context/CartContext';

function CartItem({ item }) {

  const { removeFromCart , increaseAmount , decreaseAmount } = useContext(CartContext);
  const { id, title, image, price, amount } = item;
  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500 mb-4'>
      <div className="w-full min-h-[150px] flex items-center gap-x-4 ">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px] " src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">

          {/* Title */}
          <div className="flex justify-between mb-2">
            <Link style={{ color: "#222" , fontSize: "11px" }}
              to={`/product/${id}`}
              className="text-uppercase fw-medium text-decoration-none "
            >
              {title}
            </Link>

            {/* Remove Icons */}
            <div className="text-xl cursor-pointer" onClick={()=> removeFromCart(id)}>
              <i className="bi bi-x-circle-fill text-gray-500 hover:text-red-500 transition duration-300"></i>
            </div>
          </div>

          <div className=" flex gap-x-2 h--[36px] text-sm">

            <div className="flex flexx-1 max-w-[100px]  items-center h-full border text-muted font-medium ">
              {/* Minus Icon */}

              <div className="flex-1 flex justify-center items-center cursor-pointer h-full p-1 " onClick={() => decreaseAmount(id)} >

                <i className="bi bi-dash"></i>
              </div>

              {/* Amount  */}
              <div className="h-full flex justify-center items-center px-2">{amount}</div>
              {/* Plus Icon */}
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer  p-1" onClick={() => increaseAmount(id)}>

                <i className="bi bi-plus-lg"></i>
              </div>

            </div>
            {/* Price  */}
            <div className="d-flex align-items-center gap-1 flex-1">
              <i className="bi bi-currency-rupee"></i>
              {Math.round(price * 10)}
            </div>


            {/* Final Price */}
            <div
              className="fw-bold"
              style={{
                background: "#FF6900",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                width: "fit-content",
                display: "inline-block",
                fontSize: "12px",
              }}
            >
              <i className="bi bi-currency-rupee"></i>
              {(Math.round(item.price) * amount) * 10}
            </div>



          </div>

          {/* Quantity  */}
        </div>
      </div>
    </div>
  )
}

export default CartItem