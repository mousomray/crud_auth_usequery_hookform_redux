import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' // Import Use Query
import { useDispatch } from 'react-redux' // Import Dispatch
import { detailsproduct } from "./productapi"; // Import Details Function 
import { useParams } from 'react-router-dom' //Import  Useparams 
import Layout from '../Common/Layout' // Import Layout

const Details = () => {

    const { id } = useParams(); // Useparams 
    const dispatch = useDispatch(); // For Dispatch

    const getdetailsdata = async () => {
        const response = await dispatch(detailsproduct(id)) // Call function 
        console.log("My Details response is ", response);
        return response?.payload
    }

    // Use Query Area 
    const { isLoading, isError, data: detailsdata, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getdetailsdata // This line of code work as same as useEffect()
    })

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Layout>

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            Details
                        </div>
                        <div className="card-body">
                        <img src={detailsdata?.image} alt="Error" style={{height:'300px', width:'100%'}} />
                            <h5 className="card-title"><b>Name : </b>{detailsdata?.name}</h5>
                            <h5 className="card-title"><b>Brand : </b>{detailsdata?.brand}</h5>
                            <h5 className="card-title"><b>Price : </b>{detailsdata?.price}</h5>
                            <h5 className="card-title"><b>Description : </b>{detailsdata?.description}</h5>
                            <Link to="/showproduct" className="btn btn-primary">Back</Link>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Details
