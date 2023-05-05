import axios from 'axios';
import '../css/navbar.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

const Login = () => {
    const obj = {
        email: "",
        password: ""
    }
    const [login, setLogin] = useState(obj);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value })
    }
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    })

    // console.log("login>>>>>>", login);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:8080/login', login)
            .then((response) => {
                console.log("res--------", response)
                if (response.data.auth) {
                    localStorage.setItem("user", JSON.stringify(response.data.loginuser))
                    localStorage.setItem("token", JSON.stringify(response.data.auth))
                    navigate("/")
                } else {
                    alert("Invalid login details")
                }
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
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    value={login.email}
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
                                    value={login.password}
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
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    Not have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login;
