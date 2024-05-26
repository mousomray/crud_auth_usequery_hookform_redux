import { createAsyncThunk } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for Add Product
export const addproduct = createAsyncThunk("addproduct", async (data, { rejectWithValue }) => {
    try {
        const apiurl = "create/product"
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add Product data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add Product data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Show All Product
export const showproduct = createAsyncThunk("showproduct", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "product"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Show Product data", response);
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching Show Product data", error);
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Details Product
export const detailsproduct = createAsyncThunk("detailsproduct", async (id, { rejectWithValue }) => {
    try {
      const apiurl = `edit/product/${id}`
      const response = await axiosInstance.get(apiurl);
      console.log("Fetching Details Product data", response);
      return response?.data?.data;
    } catch (error) {
      console.log("Error Fetching Details Product data", error);
      return rejectWithValue(error.response.data);
    }
  });


// Data Fetch For Edit Product 
export const editproduct = createAsyncThunk("editproduct", async ({ id, formdata }, { rejectWithValue }) => {
    try {

        const apiurl = `update/product/${id}`;
        const response = await axiosInstance.post(apiurl, formdata);
        console.log("Fetching Edit data..", response);
        toast.success(response?.data?.message);
        return response.data;
    } catch (error) {
        console.log("Error Fetching Edit data", error);
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
    }
});


// Call Api for Delete Product
export const deleteproduct = createAsyncThunk("deleteproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `delete/product/${id}`
        const response = await axiosInstance.delete(apiurl);
        console.log("Fetching Delete Product data", response);
        toast.warning(response?.data?.message)
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching Delete Product data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});