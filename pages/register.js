import React, { useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Register = () => {
    const [error, setError] = useState(null)
    const emailRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const checkPassword = () => {
        if (passwordRef.current.value
            !== confirmPasswordRef.current.value
            ) {
                setError('password must match')
            } else {
                setError(null)
            }
    }

    const registerHandler = (e) => {
        const data = {
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value
        }
        e.preventDefault()

        axios
            .post('/v1/auth/register', data)
            .then(res => {
                console.log(res)
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false
                })
            })
            .catch(err => {
                console.log(err.response.data.errors[0].message)
                toast.error(err.response.data.errors[0].message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false
                })
            })
    }

    return (
    <div>
        <h1>Register</h1>
        <form>
            <input type='text' name='firstName' ref={firstNameRef} placeholder='Enter First Name' /><br />
            <input type='text' name='lastName' ref={lastNameRef} placeholder='Enter Last Name' /><br />
            <input type='email' name='email' ref={emailRef} placeholder='Enter your email' /><br />
            <input type='password' name='password' ref={passwordRef} placeholder='Create Password' /><br />
            <input type='password' onChange={checkPassword} name='confirmPassword' placeholder='Confirm password' ref={confirmPasswordRef} />
            { error ? <p>{error}</p> : null}
            <br /><hr />
            <button onClick={(e) => registerHandler(e)}>Register</button>
        </form>
    </div>
    )
}

export default Register