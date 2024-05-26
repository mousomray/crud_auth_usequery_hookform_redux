import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dashboard } from './profileapi' // Call Dashboard Function 
import { useQuery } from '@tanstack/react-query' // Import Use Query 
import Layout from '../Common/Layout';

const Dashboard = () => {

    const dispatch = useDispatch()

    const getDashboarddata = async () => {
        const response = await dispatch(dashboard())
        return response?.payload
    }

    const { isLoading, isError, data: dashboarddata, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboarddata // This line of code work as same as useEffect()
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
                            <h1 style={{fontSize:'50px'}}>Dashboard</h1>
                        </div>
                        <div className="card-body">
                            <img src={dashboarddata?.image} alt="" />
                            <h5 className="card-title"><b>Name : </b>{dashboarddata?.name}</h5>
                            <h5 className="card-title"><b>User ID : </b>{dashboarddata?._id}</h5>
                            <h5 className="card-title"><b>Email : </b>{dashboarddata?.email}</h5>
                            <h5 className="card-title"><b>Password : </b>{dashboarddata?.password}</h5>
                            <h5 className="card-title"><b>Mobile : </b>{dashboarddata?.mobile}</h5>
                            <h5 className="card-title"><b>First School : </b>{dashboarddata?.first_school}</h5>
                            <h5 className="card-title"><b>Role : </b>{dashboarddata?.role}</h5>
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
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

export default Dashboard
