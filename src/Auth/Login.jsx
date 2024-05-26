import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { Link } from 'react-router-dom';
import { loginRequest, RegLog } from '../Auth/authslice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form'; // Import useForm hook 



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State
    const { redirectTo, loading } = useSelector((state) => state?.Auth);


    const onSubmit = async (data) => {

        const reg = {
            email: data.email,
            password: data.password
        };

        try {
            const response = await dispatch(loginRequest(reg))
            console.log("Loginasaaaaaaaaaaaaa", response);
            if (response && response?.payload?.status === true) {
                reset()
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }





    // Redirect if get the token or not get the token 
    const redirectUser = () => {
        let token = localStorage.getItem("token")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

        if (token !== null && token !== undefined && token !== "") {
            isInLoginPage && navigate("/");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectTo])



    // If I not use this function then I can't go register page when token will be present in local storage

    const log = () => {
        dispatch(RegLog())
    }


    return (
        <Layout>
            <Container component="main" maxWidth="xs" style={{ marginTop: '150px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>


                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    {...register("email", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Email Pattern should be xyz@gmail.com",
                                        },
                                    })}
                                />
                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="Password"
                                    {...register("password", {
                                        required: "This field is Required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be 8 characters"
                                        }
                                    })}
                                />
                                {errors?.password && (
                                    <p style={{ color: 'red' }}>{errors.password.message}</p>
                                )}
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress color="inherit" /> : "Login"}

                        </Button>
                        <Grid container style={{ display: "flex", justifyContent: "center" }}>
                            <Grid item>
                                <Link to="/signup" variant="body2" onClick={log}>
                                    {"Don't have an account? Register Now"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/forget" variant="body2">
                                    {"Forget Password"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Login;