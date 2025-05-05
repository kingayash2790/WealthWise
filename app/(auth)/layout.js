import React from 'react'

// Define the AuthLayout component which takes children as a prop
const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center pt-40">
      {children}
    </div>
  )
}

export default AuthLayout;
