import { Box, Button, TextField, Typography } from '@mui/material'
// import {  Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
// import toast from 'react-hot-toast'

const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(name,email,password)

        try {
            await axios.post(`${process.env.REACT_APP_API}/users/register`, { name, email, password })
            alert("Successfully registered")
            navigate("/login")
        } catch (error) {
            alert("invalid username or password")
        }
    }
    // prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    },[navigate])
    
    
    
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
    return (
        // <>
        //     <Box>
        //         <Form >
        //             <h1>Register Form</h1>
        //             <Form.Item label="Name" name='name'>
        //                 <Input/>
        //             </Form.Item>
        //             <Form.Item label="Email" name='email'>
        //                 <Input type='email'/>
        //             </Form.Item>
        //             <Form.Item label="Password" name='Password'>
        //                 <Input type='password'/>
        //             </Form.Item>

        //             <Box>
        //                 <Link to='/login'>Already Register ? Please Click Here To Login</Link>
        //                 <Button onClick={submitHandler}>Register</Button>
        //             </Box>
        //         </Form>
        //     </Box>
        // </>

        <Box sx={{ height: "90vh" }}>

            <Box sx={styles.main}>

                    <Typography style={{ fontSize: '30px' }}>Register Form</Typography>
                        <TextField type='text' margin='normal' value={name} onChange={(e)=>setName(e.target.value)} label="Name" variant="outlined" required />
                    
                        <TextField type='email' value={email} margin='normal' onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" required />
                        <TextField type='password' value={password} margin='normal' onChange={(e)=>setPassword(e.target.value)}  label="Password" variant="outlined" required />
          <Box sx={{display:'flex',flexDirection:"column",marginTop:"20px"}}>
              <Link to="/login">Already Register ? Click here to Login</Link>
              <Button onClick={handleSubmit}   >Register</Button>
                    </Box>


                </Box>
            </Box>
  )
}

export default Register