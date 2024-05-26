import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { Link } from 'react-router-dom';
import { forget } from './profileapi';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PasswordIcon from '@mui/icons-material/Password';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form'; // Import useForm hook 



const Forget = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State

    const onSubmit = async (data) => {

        setLoading(true)

        const reg = {
            email: data.email,
            first_school: data.first_school,
            newPassword: data.newPassword
        };

        try {
            const response = await dispatch(forget(reg))
            console.log("Forget poda", response);
            if (response && response?.payload?.success === true) {
                setLoading(false)
                reset()
                navigate("/login")
            }else{
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
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
                        <PasswordIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forget Password
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
                                    id="first_school"
                                    label="First School"
                                    {...register("first_school", {
                                        required: "This field is Required",
                                        minLength: {
                                            value: 3,
                                            message: "First School must be atleast 3 characters"
                                        }
                                    })}
                                />
                                {errors?.first_school && (
                                    <p style={{ color: 'red' }}>{errors.first_school.message}</p>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="newPassword"
                                    label="New Password"
                                    {...register("newPassword", {
                                        required: "This field is Required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be 8 characters"
                                        }
                                    })}
                                />
                                {errors?.newPassword && (
                                    <p style={{ color: 'red' }}>{errors.newPassword.message}</p>
                                )}
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress color="inherit" /> : "Change"}

                        </Button>
                        <Grid container style={{ display: "flex", justifyContent: "center" }}>
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    <button className='btn-primary'>Back</button>
                                </Link>
                            </Grid>
                            
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Forget;