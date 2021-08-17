import React from "react";

const CreateAcc = () => {
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
											type="email"
											placeholder="Email Address"
											name="create-account-email"
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											type="password"
											placeholder="Password"
											name="create-account-password"
										/>
										<div className="text-left">
											<small>
												Your password should be at least
												8 characters
											</small>
										</div>
									</div>
									<button
										className="btn btn-lg btn-block btn-primary"
										role="button"
										type="submit"
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

export default CreateAcc;
