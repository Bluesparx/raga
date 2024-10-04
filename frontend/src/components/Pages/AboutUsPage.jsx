import React from 'react'
import AboutUs from '../AboutUs'
import { Vortex } from '../ui/vortex'
import { Navbar2 } from '../Navbar2'
const AboutUsPage = () => {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
    <Vortex>
      <Navbar2 />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "7rem",
          paddingBottom: "4rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "60%",
            padding: "40px",
            backgroundColor: "black",
            borderRadius: "12px",
            boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "25px",
              color: "#e0e0e0",
            }}
          >
          
          </h1>
      <AboutUs/>
      </div>
      </div>
      </Vortex>
     
    </div>
  )
}

export default AboutUsPage
