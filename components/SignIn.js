import React from "react";

const SignIn = (props) => {
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
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Password"
											name="login-password"
										/>
										<div className="text-right">
											<small>
												<a href="#">Forgot password?</a>
											</small>
										</div>
									</div>
									<button
										className="btn btn-lg btn-block btn-primary"
										role="button"
										type="submit"
										onClick={props.clicked.bind(
											this,
											"profile"
										)}
									>
										Log in
									</button>
									<small>
										Don't have an account yet?{" "}
										<a href="#">Create one</a>
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

export default SignIn;
