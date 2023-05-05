import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  Box, Button, Container, Grid, TextField } from '@mui/material';

const Update = () => {
    const obj = {
        image: "",
        name: "",
        material: "",
        features: "",
        price: "",
        colour: "",
        warunty: "",
        userId: JSON.parse(localStorage.getItem("user"))._id
    }
    const navigate = useNavigate();
    const [addproduct, setProduct] = useState(obj);

    console.log('addproduct', addproduct)
    const params = useParams();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProduct({ ...addproduct, [name]: value })
    }

    const getProduct = async () => {
        await axios.get(`http://localhost:8080/watch/${params.id}`, {
            headers: {
                authorization: `${JSON.parse(localStorage.getItem("token"))}`
            }
        })
            .then((response) => {
                // console.log("watchhhhhhhhhhh", response);
                setProduct(response.data);
            }, (error) => {
                console.log(error);

            });
    }

    useEffect(() => {
        getProduct();
    }, []);

    const handleUpdate = async (e) => {
        const formData = new FormData();
        formData.append("image", addproduct.image);
        formData.append("name", addproduct.name);
        formData.append("material", addproduct.material);
        formData.append("features", addproduct.features);
        formData.append("price", addproduct.price);
        formData.append("colour", addproduct.colour);
        formData.append("warunty", addproduct.warunty);
        formData.append("userId", addproduct.userId);

        try {
            e.preventDefault();
            console.log("addproduct", addproduct)
            const response = await axios.put(`http://localhost:8080/watch/${params.id}`, formData, {
                headers: {
                    authorization: `${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            console.log("watchhhhhhhhhhh=====================", response);
            alert("update")
            navigate("/product");
        } catch (error) {
            console.log(error);
            alert("not  update")
        }
    }

    const imageUpload = (e) => {
        setProduct({ ...addproduct, image: e.target.files[0] })
        // console.log(event.target.files[0])
    }



    return (
        // <div>
        //     <form>
        //         <div className='register'>
        //             <div className="mb-3 register-width">
        //                 <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     id="exampleInputEmail1"
        //                     value={addproduct.name}
        //                     name="name"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width" >
        //                 <label htmlFor="exampleInputEmail1" className="form-label">Materials:</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     id="exampleInputEmail1"
        //                     value={addproduct.material}
        //                     name="material"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width" >
        //                 <label htmlFor="exampleInputPassword1" className="form-label">Features:</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     id="exampleInputPassword1"
        //                     value={addproduct.features}
        //                     name="features"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width" >
        //                 <label htmlFor="exampleInputPassword1" className="form-label">Price:</label>
        //                 <input type="number"
        //                     className="form-control"
        //                     id="exampleInputPassword1"
        //                     value={addproduct.price}
        //                     name="price"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width" >
        //                 <label htmlFor="exampleInputPassword1" className="form-label">Colour:</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     id="exampleInputPassword1"
        //                     value={addproduct.colour}
        //                     name="colour"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width" >
        //                 <label htmlFor="exampleInputPassword1" className="form-label">warunty:</label>
        //                 <input type="text"
        //                     className="form-control"
        //                     id="exampleInputPassword1"
        //                     value={addproduct.warunty}
        //                     name="warunty"
        //                     onChange={handleChange}
        //                 />

        //             </div>
        //             <div className="mb-3 register-width">
        //                 <label htmlFor="image" className="form-label">Image:</label>
        //                 <input type="file"
        //                     name="image"
        //                     onChange={imageUpload}
        //                     accept=".jpg,.jpeg,.png" />

        //             </div>

        //             <button type="submit" onClick={(e) => handleUpdate(e)} className="btn btn-primary">Update Product</button>
        //         </div>
        //     </form>
        // </div>
        <>
         <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoComplete="family-name"
                  value={addproduct.name}
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Material"
                  label="Material"
                  autoComplete="email"
                  value={addproduct.material}
                  name="material"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Features"
                  id="Features"
                  autoComplete="Features"
                  value={addproduct.features}
                  name="features"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  id="Price"
                  autoComplete="Price"
                  value={addproduct.price}
                  name="price"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Colour"
                  id="Colour"
                  autoComplete="Colour"
                  value={addproduct.colour}
                  name="colour"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="warunty"
                  id="warunty"
                  autoComplete="new-warunty"
                  value={addproduct.warunty}
                  name="warunty"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file"
                  name="image"
                  onChange={imageUpload}
                  accept=".jpg,.jpeg,.png" />
              </Grid>
            </Grid>
            <Button
              onClick={handleUpdate}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
        </>
    )
}

export default Update;
