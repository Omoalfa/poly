import React, { useRef, useState } from 'react'
import axios from 'axios'



const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        console.log(value)
        axios.post('http://localhost:3000/v1/auth/login', value)
            .catch(error => setError(error))
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            {
                error && <p>{error}</p>
            }
            <input type='email' name='email' ref={emailRef} />
            <input type='password' ref={passwordRef} />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login