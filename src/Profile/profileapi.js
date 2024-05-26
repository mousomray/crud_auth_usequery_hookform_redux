import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api For User Dashboard
export const dashboard = createAsyncThunk("dashboard", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'user/dashboard'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Dashboard data", response);
        return response?.data?.data[0]
    } catch (error) {
        console.log("Error Fetching Dashboard data", error);
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Forget Password
export const forget = createAsyncThunk("forget", async (data, { rejectWithValue }) => {
    try {
        const apiurl = "forget-password"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Forget Password data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Forget Password data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Update Password
export const update = createAsyncThunk("update", async (data, { rejectWithValue }) => {
    try {
        const apiurl = "update-password"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching update Password data", response);
        toast.success(response?.data?.msg)
        return response.data;
    } catch (error) {
        console.log("Error update Password data", error);
        toast.error("Password is Not Updated")
        return rejectWithValue(error.response.data);
    }
});