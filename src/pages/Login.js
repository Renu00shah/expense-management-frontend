import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
// import {toast} from 'react-hot-toast'



const Login = () => {
     const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
        const navigate=useNavigate()


     const handleSubmit =async (e) => {
         e.preventDefault()
         try {
             const { data}=await axios.post(`${process.env.REACT_APP_API}/users/login`, {  email, password })
             alert("Successfully login")
             localStorage.setItem("user",JSON.stringify({...data.user,password:""}))
             navigate("/")
        } catch (error) {
            alert("invalid username or password")
        }
    }
    const styles = {
        main: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: "70vh",
            fontSize:"20px"
        }
    }


    // prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    },[navigate])
    
  return (

<>
            <Box sx={{ border: "2px solid red", height: "90vh" }}>

            <Box sx={styles.main}>

                    <Typography style={{ fontSize: '30px' }}>Login Form</Typography>
                    
                        <TextField type='email' value={email} margin='normal' onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" required />
                        <TextField type='password' value={password} margin='normal' onChange={(e)=>setPassword(e.target.value)}  label="Password" variant="outlined" required />
          <Box sx={{display:'flex',flexDirection:"column",marginTop:"20px"}}>
              <Link to="/register">Already Login ? Click here to Register </Link>
              <Button onClick={handleSubmit}   >Login</Button>
                    </Box>


                </Box>
            </Box>
        </>
    )
}

export default Login