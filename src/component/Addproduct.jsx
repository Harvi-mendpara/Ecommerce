import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  Box, Button, Container, Grid, TextField } from '@mui/material';


const Addproduct = () => {
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
  const [addproduct, setAddproduct] = useState(obj);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddproduct({ ...addproduct, [name]: value })
  }

  console.log("register>>>>>>", addproduct);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addproduct.name || !addproduct.material || !addproduct.features || !addproduct.price || !addproduct.colour || !addproduct.warunty || !addproduct.image) {
      setError(true);
      return;
    }

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
      const response = await axios.post('http://localhost:8080/add-watch', formData, {
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("token"))}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("watchhhhhhhhhhh", response);
      alert("data has been submitted!!!");
      setAddproduct(obj);
      navigate("/product");
    } catch (error) {
      console.log(error);
      alert("oops try again!!!");
    }
  }

  const imageUpload = (e) => {
    setAddproduct({ ...addproduct, image: e.target.files[0] })
    // console.log(event.target.files[0])
  }


  return (
   
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                {error && !addproduct.name && <span className='invalid_input'>Enter Valid Name</span>}
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
                {error && !addproduct.material && <span className='invalid_input'>Enter Valid Materials</span>}
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
                {error && !addproduct.features && <span className='invalid_input'>Enter Valid Features</span>}
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
                {error && !addproduct.price && <span className='invalid_input'>Enter Valid Price</span>}
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
                {error && !addproduct.colour && <span className='invalid_input'>Enter Valid Colour</span>}
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
                {error && !addproduct.warunty && <span className='invalid_input'>Enter Valid warunty</span>}
              </Grid>
              <Grid item xs={12}>
                <input type="file"
                  name="image"
                  onChange={imageUpload}
                  accept=".jpg,.jpeg,.png" />
                {error && !addproduct.image && <span className='invalid_input'>Select Image</span>}
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
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

export default Addproduct
