import React, { useState } from 'react';
import '../css/navbar.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

const Register = () => {

  const obj = {
    name: "",
    email: "",
    password: ""
  }
  const [register, setRegister] = useState(obj);
  const navigate = useNavigate();


  //already login so not acess register page 

  // useEffect(()=>{
  //   const auth=localStorage.getItem("user");
  //   if(auth){
  //     navigate("/");
  //   }
  // })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegister({ ...register, [name]: value })
  }


  console.log("register>>>>>>", register);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/register', register)
      .then((response) => {
        console.log("registerrrrrrrrrrr", response);
        navigate("/login")
      }, (error) => {
        console.log(error);
      });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoComplete="family-name"
                  value={register.name}
                  name="name"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  value={register.email}
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={register.password}
                  name="password"
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>


    </>

  )
}

export default Register;
