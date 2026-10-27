import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { SideBarContext } from '../context/SideBarContext.jsx';

function Header() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const { itemAmount } = useContext(CartContext);
  const [isActive , setIsActive] = useState(false);

  // Event Listenre 

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 60 ? setIsActive (true) : setIsActive (false)
    })
  })

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6 '} fixed w-full z-10 transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center h-5 px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="black"
            className="bi bi-bluesky"
            viewBox="0 0 16 16"
            style={{ marginLeft: "5px" }}
          >
            <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948" />
          </svg>
        </Link>

        {/* Actions (Admin & Cart) */}
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-orange-500 transition shadow-sm"
            style={{ textDecoration: 'none' }}
            title="Open Admin Panel"
          >
            <i className="bi bi-shield-lock-fill"></i>
            <span>Admin</span>
          </Link>

          {/* Cart */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative items-center"
          >
            <i className="bi bi-bag text-3xl"></i>

            <div className="bg-red-500 absolute -right-2 -bottom-1 flex items-center justify-center w-[20px] h-[20px] text-white text-xs rounded-full">
              {itemAmount}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
