import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const [loginUser, setLoginUser] = useState("")
    const navigate=useNavigate()

    const logoutHandle = () => {
        localStorage.removeItem("user")
        alert("User Logout Successfully")
        navigate("/login")
    }
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setLoginUser(user)
        }
    },[])
    const styles = {
        main: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '20px',
            backgroundColor: "lightgrey",
            boxShadow:'5px 5px 10px #ccc'
        }
    }
  return (
      <>
          <Box sx={styles.main}>
              <Box>
                  <Link style={{color:"black",fontSize:"30px"}} to="/">Expense Management</Link>
              </Box>
              <Box>
                  <Link style={{ color: "black", fontSize: "30px" }} to="/user">
                      {loginUser && loginUser.name}
                  </Link>
                  <Button onClick={logoutHandle} style={{ color: "black", fontSize: "30px" }} >
                      Logout
                  </Button>
              </Box>
      </Box>
      
      
      </>
  )
}

export default Header