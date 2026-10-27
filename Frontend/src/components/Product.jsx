import React, { useContext } from 'react'

import { Link } from 'react-router-dom';

// import {BsPlus , BsEyeFill} from 'react-icons/bs'

import { CartContext } from '../context/CartContext.jsx';


const Product = ({ product }) => {
    // console.log("Products", product);
    const { addToCart } = useContext(CartContext);

    const { id, image, category, title, price } = product;
    return (
        <div>
            <div className="border border-[#efe4ef] h-[300px] mb-4 relative overflow-hidden group transition ">
                <div className="w-full h-full flex justify-center items-center">
                    {/* Image  */}
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                        <img className="max-h-[160px] group-hover:scale-110 transition duration-300" src={image} alt={title} />
                    </div>
                </div>

                {/* Buttons  */}
                <div className="absolute top-6 -right-11 group-hover:right-5  p-2  p-2 flex flex-col items-center  justify-center gap-y-2  opacity-1 group-hover:opacity-100  transition-all duration-300">
                    <button onClick={() => addToCart(product, id)}>
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-orange-500 ">
                            <i className="bi bi-bag-plus-fill"></i>
                        </div>
                    </button>
                    <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-muted drop-shadow-xl  '><i className="bi bi-eye-fill"></i></Link>
                </div>
            </div>

            {/* Other Informatio About The Product */}
            <div className="">
                <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>

                <Link to={`/product/${id}`} className="text-decoration-none">
                    <h2
                        className="fs-6 fw-bold mb-1"
                        style={{
                            color: "#793f09ff",
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textDecoration: "none",
                            display: "block",
                        }}
                    >
                        {title}
                    </h2>

                </Link>


                <div className='font-semibold'><i className="bi bi-currency-rupee"></i>{Math.round(price * 10)}</div>
            </div>
        </div>
    )
}
export default Product