import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  return (
    <>
      {user ? (
        user.user.role === "admin" || user.user.role === "user" ? (
          children
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
