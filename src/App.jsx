import { Link, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Products from "./products"
import Profile from "./Profile"
import Auth from "./Auth"
import Cart from "./Cart"



function App() {
  return (
    <>
      <header>
        <nav>
          <Link to= "/">Home</Link>
          <Link to= "/Products">Products</Link>
          <Link to= "/Cart">Cart</Link>
          <Link to= "/Profile">Profile</Link>
          <Link to= "/Auth">Login</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path ='/' element={<Home />} />
          <Route path ='/Products' element={<Products />} />
          <Route path ='/Cart' element={<Cart />} />
          <Route path ='/Profile' element={<Profile />} />
          <Route path ='/Auth' element={<Auth />} />
        </Routes>
      </main>

    </>
  )

}

export default App
