import React from 'react'
import Layout from '../Common/Layout'

const Home = () => {
  return (
    <>
      <Layout>

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 style={{fontSize:'50px'}}>Welcome To Home Page </h1>
        </div>
      </Layout>
    </>
  )
}

export default Home
