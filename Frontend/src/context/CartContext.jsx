import React, { createContext, useEffect, useState } from 'react';

// price formula: Math.round(price * 10)

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [itemAmount, setItemAmount] = useState(0);

  // total price
  const [total , setTotal] = useState(0);



  useEffect(() => {
    const total = cart.reduce((accumulator , currentItem) => {
      return accumulator + currentItem.price * currentItem.amount
    },0);
    setTotal(Math.round(total)*10);
  })

  useEffect(() => {
    if(cart){
      const amount = cart.reduce((accumulator , currentItem) => {
        return accumulator + currentItem.amount
      },0);
      setItemAmount(amount);
    }
  },[cart])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    addToCart(cartItem, id);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);

    // if item not found → do nothing
    if (!cartItem) return;

    // if amount becomes 0 → remove item
    if (cartItem.amount <= 1) {
      removeFromCart(id);
      return;
    }

    // otherwise decrease amount
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, amount: cartItem.amount - 1 };
      }
      return item;
    });

    setCart(newCart);
  };


  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseAmount,
      decreaseAmount,
      itemAmount,
      total,

    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
