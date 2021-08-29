import { useRef } from "react";
import { useRouter, a } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({
    autoClose: 1000,
    draggable: false
})

//that was for wrong credenttials

//now the correct credentials

//done!!!!!!!!!!!!!

function Login  ()  {
	const emailRef = useRef()
	const passwordRef = useRef()
    const router = useRouter()

	const handleSubmit = (e) => {
        e.preventDefault()
		axios
			.post('/v1/auth/login', {
				email: emailRef.current.value,
				password: passwordRef.current.value
			})
            .then(res => router.push('/'))
            .catch(error => {
                console.log(error.response)
                toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
                draggable: false
            })})
	}

	return (
		<div>
			<div className="main-container fullscreen">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6 col-md-7">
							<div className="text-center">
								<h1 className="h2">Welcome Back &#x1f44b;</h1>
								<p className="lead">
									Log in to your account to continue
								</p>
								<form>
									<div className="form-group">
										<input
											className="form-control"
											type="email"
											placeholder="Email Address"
											name="login-email"
											ref={emailRef}
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Password"
											name="login-password"
											ref={passwordRef}
										/>
										<div className="text-right">
											<small>
												<a href="/forgotpassword">Forgot password?</a>
											</small>
										</div>
									</div>
									<button
										className="btn btn-lg btn-block btn-primary"
										role="button"
										type="submit"
										onClick={(e) => handleSubmit(e)}
									>
										Log in
									</button>
									<small>
										Don't have an account yet?{" "}
										<a href="/register">Create one</a>
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

export default Login;
