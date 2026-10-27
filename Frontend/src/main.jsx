import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import ProductProvider from './context/ProductContext.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx'
import CartProvider from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(

  <SideBarProvider>
    <CartProvider>  
    <ProductProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ProductProvider>
    </CartProvider>
  </SideBarProvider>
)
