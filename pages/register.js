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
			<div className="main-container fullscreen">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-7">
							<div className="text-center">
								<h1 className="h2">Create account</h1>
								<p className="lead">
									Start doing things for free, in an instant
								</p>
								<button className="btn btn-lg btn-block btn-primary">
									<img
										alt="Google"
										src="assets/img/logo-google.svg"
										className="rounded align-top mr-2"
									/>
									Continue with Google
								</button>
								<hr />
								<form>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            ref={firstNameRef}
                                        />
                                    </div>
                                    <div className="form-group">
										<input
											className="form-control"
											type="text"
											placeholder="Enter last name"
											name="lastName"
                                            ref={lastNameRef}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="email"
											placeholder="Email Address"
											name="create-account-email"
                                            ref={emailRef}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Password"
											name="create-account-password"
                                            ref={passwordRef}
										/>
										<div className="text-left">
											<small>
												Your password should be at least
												8 characters
											</small>
										</div>
									</div>
                                    <div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Password"
											name="confirmpassword"
                                            ref={confirmPasswordRef}
                                            onChange={checkPassword}
										/>
										<div className="text-left">
											{
                                                error &&
                                                <small>
                                                    {error}
											    </small>
                                            }
										</div>
									</div>
									<button
										className="btn btn-lg btn-block btn-primary"
										role="button"
										type="submit"
                                        onClick={e => registerHandler(e)}
									>
										Create account
									</button>
									<small>
										By clicking 'Create Account' you agree
										to our <a href="#">Terms of Use</a>
									</small>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
