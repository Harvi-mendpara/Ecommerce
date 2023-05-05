import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../src/css/navbar.css";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

function Mainnavbar({ size }) {

  const auth = localStorage.getItem("user");
  console.log("authhhhhhhhhhhhhhh", auth)
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/register")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "black" }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ "fontSize": "18px" }}>
          {
            auth ?
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

               
                <li className="nav-item mainnav">
                  <Link className="nav-link color" to="/addproduct" style={{ color: "white" }}>Add Product</Link>
                </li>
                <li className="nav-item mainnav">
                  <Link className="nav-link color" to="/product" style={{ color: "white" }}>Product</Link>
                </li>
                <li className="nav-item mainnav">
                  <Link className="nav-link color" aria-current="page" to="/register" onClick={logout} style={{ color: "white" }}>Logout ({JSON.parse(auth).name})</Link>
                </li>
              </ul>
              :
              <>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item mainnav">
                    <Link className="nav-link color" aria-current="page" to="/" style={{ color: "white" }}>Home</Link>
                  </li>
                  <li className="nav-item mainnav">
                    <Link className="nav-link color" aria-current="page" to="/cart" style={{ color: "white" }}><ShoppingCartRoundedIcon /> <span>{size}</span></Link>
                  </li>

                  <li className="nav-item mainnav">
                    <Link className="nav-link color" aria-current="page" to="/register" style={{ color: "white" }}>Register</Link>
                  </li>
                  <li className="nav-item mainnav">
                    <Link className="nav-link color" to="/login" style={{ color: "white" }}>Login</Link>
                  </li>
                  <li className="nav-item mainnav">
                    <Link className="nav-link color" aria-current="page" to="/check" style={{ color: "white" }}>Checkout</Link>
                  </li>
                

                </ul>
              </>
          }




        </div>
      </div>
    </nav>
  );
}

export default Mainnavbar;