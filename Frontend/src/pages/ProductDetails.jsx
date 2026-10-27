import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Correct ID match
  const product = products.find(item => item.id == id);

  // Loading
  if (!product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-danger"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="py-12 lg:py-20 min-h-[100vh] flex items-center">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src={image}
              alt={title}
              className="max-w-[250px] lg:max-w-[380px]"
            />
          </div>

          {/* RIGHT SIDE → all equal width */}
          <div className="flex-1 lg:text-left text-center">

            {/* Wrapper that controls equal width */}
            <div style={{ maxWidth: "500px", width: "100%" }} className="mx-auto lg:mx-0 space-y-4">

              {/* TITLE */}
              <h1
                className="text-[28px] lg:text-[36px] font-bold leading-snug mb-4"
                style={{
                  textAlign: "left",
                  lineHeight: "1.3",
                  letterSpacing: "0.5px",
                  maxWidth: "500px"
                }}
              >
                {title}
              </h1>


              {/* PRICE BOX same width */}
              <div
                className="flex items-center gap-3 px-4 py-3 justify-center lg:justify-start mb-4"
                style={{
                  background: "#f2f2f2",
                  width: "100%",
                  textAlign:"center"
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #E6BE00)",
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    fontSize: "18px",
                    color: "#8A6D00",
                    fontWeight: "bold"
                  }}
                >
                  <i className="bi bi-currency-rupee"></i>
                </div>

                <span
                  style={{
                    color: "#333",
                    fontSize: "20px",
                    fontWeight: "600",
                    letterSpacing: "0.5px"
                  }}
                >
                  {Math.round(price * 10)}
                </span>
              </div>

              {/* DESCRIPTION same width */}
              <p
                className="text-gray-700"
                style={{
                  textAlign: "justify",
                  lineHeight: "1.6",
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                {description}
              </p>

              {/* ADD TO CART BUTTON same width */}
              <button
                className="anime-cart-btn"
                style={{
                  width: "100%",
                  textAlign: "center",
                  background: "#FB2C36",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px"
                }}

                onClick={() => addToCart(product , product.id)}
              >
                <i className="bi bi-cart-plus"></i>
                Add to Cart
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
