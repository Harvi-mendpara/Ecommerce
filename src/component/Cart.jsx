import React from 'react';
import "../css/cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {

    const navigate=useNavigate()
    const handleRemove = (e, id) => {
        e.preventDefault();
        console.log("id", id);
        const updatedCart = cart.filter((item) => item._id !== id);
        // cart=updatedCart;
        setCart(updatedCart);
        localStorage.setItem("card", JSON.stringify(updatedCart))

    }
    const handleBuyNow = () => {
        if (isLoggedIn()) {
            navigate('/check');
        } else {
            navigate('/login');
        }
    }
    const isLoggedIn = () => {
        const isLoggedIn = localStorage.getItem('user');
        return isLoggedIn === 'true';
    }
 

    return (
        <>
            <article>
                {Array.isArray(cart) && cart.length > 0 ? (
                    <div className="row">

                        {cart && cart.map((item, index) => (
                            <div className="cart_box" key={index}>
                                <div className="cart_img">
                                    {item.images && item.images.map((imageUrl, imageIndex) => (
                                        <img key={imageIndex} src={imageUrl} alt={item.name} style={{ height: "80%", width: "100%" }} />
                                    ))}
                                    <img
                                        style={{ width: "12rem", height: "50%", cursor: "pointer" }}
                                        variant="top"
                                        src={`http://localhost:8080/Images/` + cart[index].image} alt={item.name}

                                    />

                                </div>
                                <div>
                                    <div style={{ fontSize: "18px" }}>Name:{item.name}</div>

                                    <div style={{ fontSize: "18px" }}> price : {item.price}</div>


                                </div>
                                <div>

                                    <button className='remove' onClick={(e) => handleRemove(e, item._id)} >Remove</button>
                                    {/* <button className='buynow' onClick={() => navigate('/register')} >Buy Now</button> */}
                                    <button className='buynow' onClick={handleBuyNow}>Buy Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items to display</p>
                )}
               {/* <div className='total'>
            <span>Total Price of your Cart</span>
            <span>Rs - {price}</span>
        </div> */}
            </article>

        </>
    );
};

export default Cart;



