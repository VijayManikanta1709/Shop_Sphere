import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'

import AdminHome from './admin/AdminHome.jsx'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import SideBar from './components/SideBar.jsx'

function App() {
  return (
    <div className="overflow-hidden page-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/admin' element={<AdminHome />} />
        </Routes>
        <SideBar />
        <Footer />
      </Router>
    </div>
  )
}

export default App
