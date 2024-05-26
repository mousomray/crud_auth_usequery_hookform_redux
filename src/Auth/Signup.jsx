import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../Common/Layout"; // Import Layout 
import { useForm } from "react-hook-form"; // Import Hook Form 
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useState, useEffect } from "react"; // Import Use State
import { useDispatch, useSelector } from "react-redux"; // Import Use Dispatch
import { registerUser } from "../Auth/authslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
const defaultTheme = createTheme();

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { redirectReg, loading } = useSelector((state) => state?.Auth);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [image, setImage] = useState(null);
    //console.log(watch((data) => console.log(data)));

    // Handle form submission
    const onSubmit = async (data) => {

        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("mobile", data.mobile);
        formdata.append("password", data.password);
        formdata.append("first_school", data.first_school);
        formdata.append("image", image);

        try {
            await dispatch(registerUser(formdata))
            reset()
            setImage('')
            navigate("/login")
        } catch (error) {
            console.error("Error submitting data:", error);
            setIsLoading(false)

        }
    };

    // For Redirect which is part of Authentication (Start) 
    const redirectUser = () => {
        const name = localStorage.getItem('name');
        const isInLoginPage = window.location.pathname.toLowerCase() === '/signup';
        if (name !== null && name !== undefined && name !== '') {
            isInLoginPage && navigate('/login');
        }
    };

    useEffect(() => {
        redirectUser();
    }, [redirectReg]);
    // For Redirect which is part of Authentication (End) 


    return (
        <Layout>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <Paper
                        elevation={5}
                        style={{
                            padding: "1rem 3rem",
                            marginTop: "120px",
                            width: "35rem",
                            marginBottom: "100px",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            {...register("name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.name && (
                                            <p style={{ color: 'red' }}>{errors.name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
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
                                            type="number"
                                            id="mobile"
                                            label="Mobile"
                                            {...register("mobile", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Mobile number must be 10 characters"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "Mobile number must be 10 characters"
                                                }
                                            })}
                                        />
                                        {errors?.mobile && (
                                            <p style={{ color: 'red' }}>{errors.mobile.message}</p>
                                        )}
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

                                    {/*This form section is for the submit image*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                            {image !== "" && image !== undefined && image !== null ? (
                                                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                            ) : (
                                                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                            )}
                                        </div>
                                    </Grid>
                                    {/*Image area end*/}
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <CircularProgress color="inherit" /> : "Sign Up"}
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            {"Don't have an account? Login Now"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Layout>
    );
};

export default Signup;