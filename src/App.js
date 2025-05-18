import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/footer";
import { CartProvider } from "./component/context/CartContext";
import Home from "./component/pages/Home";

export default function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar/>
        <Routes>
          {/* OUR ROUTES */}
          <Route exact path='/' element={<Home/>}/>

        </Routes>
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}