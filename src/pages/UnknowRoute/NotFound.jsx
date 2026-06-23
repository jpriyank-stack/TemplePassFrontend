import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){

  return (

    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        background:"#f8fafc"
      }}
    >

      <h1
        style={{
          fontSize:"80px",
          margin:0,
          color:"#2563eb"
        }}
      >
        404
      </h1>


      <h2>
        Page Not Found
      </h2>


      <p>
        The page you are looking for does not exist.
      </p>



      <Link
        to="/"
        style={{
          marginTop:"20px",
          color:"#2563eb",
          textDecoration:"none",
          fontWeight:"600"
        }}
      >
        Go Back Home
      </Link>


    </div>

  );

}