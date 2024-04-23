import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user ? (
        user.role === "ADMIN" || user.role === "USER" ? (
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
