import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'; // Use Dispatch
import { Navigate } from 'react-router-dom';
import { check_token } from './Auth/authslice'; // For Check Token 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query

// Import Pages Area 
import Home from './ProductPages/Home'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Addproduct from './ProductPages/Addproduct';
import Showproduct from './ProductPages/Showproduct';
import Details from './ProductPages/Details';
import Edit from './ProductPages/Edit';
import Dashboard from './Profile/Dashboard';
import Forget from './Profile/Forget';
import Update from './Profile/Update';

const App = () => {

    const dispatch = useDispatch();
    //check token avable or not
    function PrivateRoute({ children }) {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        return token !== null && token !== undefined ? (
            children
        ) : (
            <Navigate to="/login" />
        );
    }

    // Create Query Client For React Query
    const queryClient = new QueryClient()


    // Private Routing 
    const private_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/addproduct',
            component: <Addproduct />
        },
        {
            path: '/showproduct',
            component: <Showproduct />
        },
        {
            path: '/details/:id',
            component: <Details />
        },
        {
            path: '/edit/:id',
            component: <Edit />
        },
        {
            path: '/dashboard',
            component: <Dashboard />
        },
        {
            path: '/update',
            component: <Update />
        }
    ]

    // Public Routing 
    const public_routing = [
        {
            path: '/signup',
            component: <Signup />
        },
        {
            path: '/login',
            component: <Login />
        },
        {
            path: '/forget',
            component: <Forget />
        }
    ]

    // This step is required for to stop page refreshing problem in logout button
    useEffect(() => {
        dispatch(check_token())
    }, [])


    return (
        <>
            <ToastContainer />


            {/*Cover with QueryClientProvider*/}
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        {/*Private Routing Area*/}
                        {private_routing?.map((routing) => {
                            return (
                                <>
                                    <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
                                </>
                            )
                        })}

                        {/*Public Routing Area*/}
                        {public_routing?.map((routing) => {
                            return (
                                <>
                                    <Route path={routing?.path} element={routing?.component} />
                                </>
                            )
                        })}
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App
