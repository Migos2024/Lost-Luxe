import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./products";
import Profile from "./profile";
import Auth from "./Auth";
import Cart from "./cart";

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home/Logo</Link>
          <Link to="/Products">Products</Link>
          <Link to="/Cart">Cart</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/Auth">Login</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
