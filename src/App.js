import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, json } from 'react-router-dom';
import Mainnavbar from './Mainnavbar';
// import Home from './component/Home';
import Product from './component/Product';
import Register from './component/Register';
// import Footer from './Footer';
import Logout from './component/Logout';
import Addproduct from './component/Addproduct';
import Privatecom from './component/Privatecom';
import Login from './component/Login';
import Update from './component/Update';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import Newhome from './component/Newhome';


const App = () => {
 
  const [cart, setCart] = useState([]);

useEffect(()=>{
  var a=localStorage.getItem("card");
  if(a){
    setCart(JSON.parse(a));
  }
},[])
const handleClick = (item) => {
  let isPresent = false;
  cart.forEach((product) => {
    if (item.id === product._id)
      isPresent = true;
  })
  
  setCart([...cart, item]);
  var cartvalue=localStorage.getItem("card");
  let cardValues=[];
  if(cartvalue){
    cartvalue=JSON.parse(cartvalue);
    cartvalue.push(item);
    cardValues=cartvalue;
  }else{
    cardValues.push(item);
  }
  localStorage.setItem("card",JSON.stringify(cardValues))
}


  const handleChange = (item, d) =>{
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.id === item.id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].amount += d;
		
		if (tempArr[ind].amount === 0)
			tempArr[ind].amount = 1;
		setCart([...tempArr])
	}
 


  return (
    <>
      <BrowserRouter>
        <Mainnavbar size={cart.length} />
      
        <Routes>
          <Route element={<Privatecom />}>
      
         
            <Route path="/product" element={<Product />} />
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route exact path="/" element={<Newhome handleClick={handleClick} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}  handleChange={handleChange}/>} />
          <Route path="/check" element={<Checkout />} />


        </Routes>
      </BrowserRouter >
      {/* <Footer /> */}
    </>
  )
}

export default App

