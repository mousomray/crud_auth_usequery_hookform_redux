import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { update } from './profileapi';
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



const Update = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State

    const onSubmit = async (data) => {

        setLoading(true)

        const reg = {
            user_id: data.user_id,
            password: data.password
        };

        try {
            const response = await dispatch(update(reg))
            console.log("update poda", response);
            if (response && response?.payload?.success === true) {
                setLoading(false)
                reset()
                navigate("/dashboard")
            } else {
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
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>


                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user_id"
                                    label="User ID"
                                    {...register("user_id", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.user_id && <p style={{ color: 'red' }}>{errors.user_id.message}</p>}
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
                            {loading ? <CircularProgress color="inherit" /> : "Update"}

                        </Button>

                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Update;