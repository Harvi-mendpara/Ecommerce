import React, { useState } from 'react';
import "../css/check.css";
import axios from 'axios';

const Checkout = () => {
    const obj = {
        fName: "",
        lName: "",
        phoneNo: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        check: ""
    }
    const [addproduct, setAddproduct] = useState(obj);
    const [error, setError] = useState(false);

    console.log('addproduct', addproduct)

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddproduct({ ...addproduct, [name]: value })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!addproduct.fName || !addproduct.lName || !addproduct.phoneNo || !addproduct.email || !addproduct.address || !addproduct.city || !addproduct.state || !addproduct.pincode || !addproduct.check) {
            setError(true);
            return;
        }
        await axios.post(`http://localhost:8080/checkout`,addproduct,{
            headers: {
              authorization: `${JSON.parse(localStorage.getItem("token"))}`,
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => {
                console.log("watchhhhhhhhhhh", response);
                alert("data has been submitted!!!");
                setAddproduct(obj);
            }, (error) => {
                console.log(error);
                alert("oops try again!!!");
            });
    }

    return (

        <div className="col-md-10" style={{ marginLeft: "133px", marginTop: "100px" }}>
            <div className="card">
                <div className="card-header">
                    <h4>Basic Information</h4>
                </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> First Name</label>
                                <input type="text"
                                    name="fName"
                                    onChange={handleChange}
                                    value={addproduct.fName}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.fName && <span className='invalid_input'>Enter Valid First Name</span>}
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Last Name</label>
                                <input type="text"
                                    name="lName"
                                    onChange={handleChange}
                                    value={addproduct.lName}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.lName && <span className='invalid_input'>Enter Last Valid Name</span>}
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Phone Number</label>
                                <input type="number"
                                    name="phoneNo"
                                    onChange={handleChange}
                                    value={addproduct.phoneNo}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.phoneNo && <span className='invalid_input'>Enter Valid Phone number</span>}
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Email Address</label>
                                <input type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={addproduct.email}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.email && <span className='invalid_input'>Enter Valid Email</span>}
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label> Full Address</label>
                                <textarea rows="3"
                                    name="address"
                                    onChange={handleChange}
                                    value={addproduct.address}
                                    className="form-control">
                                </textarea>

                            </div>
                            {error && !addproduct.address && <span className='invalid_input'>Enter Valid Adress</span>}
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>City</label>
                                <input type="text"
                                    name="city"
                                    onChange={handleChange}
                                    value={addproduct.city}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.city && <span className='invalid_input'>Enter Valid City</span>}
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>State</label>
                                <input type="text"
                                    name="state"
                                    onChange={handleChange}
                                    value={addproduct.state}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.state && <span className='invalid_input'>Enter Valid State</span>}
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Zip Code</label>
                                <input type="text"
                                    name="pincode"
                                    onChange={handleChange}
                                    value={addproduct.pincode}
                                    className="form-control" />

                            </div>
                            {error && !addproduct.pincode && <span className='invalid_input'>Enter Valid Pincode</span>}
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <input type="checkbox"
                                    id="vehicle1"
                                    name="check"
                                    onChange={handleChange}
                                    value={addproduct.check} />
                                <label htmlFor="vehicle1" className='delivery'> Cash on delivery</label>

                            </div>

                        </div>

                        <div className="col-md-12">
                            <div className="form-group text-end">
                                <button type="button" className="btn btn-warning mx-1" onClick={handleSubmit}>Place Order</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Checkout;
