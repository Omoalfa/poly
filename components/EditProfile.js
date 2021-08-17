import React from "react";

const EditProfile = () => {
	return (
		<div>
			<div className="layout layout-nav-side">
				<div className="main-container">
					<div className="breadcrumb-bar navbar bg-white sticky-top">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="index.html">Overview</a>
								</li>
								<li className="breadcrumb-item">
									<a href="pages-utility.html#">
										Utility Pages
									</a>
								</li>
								<li
									className="breadcrumb-item active"
									aria-current="page"
								>
									Account Settings
								</li>
							</ol>
						</nav>
					</div>
					<div className="container">
						<div className="row justify-content-center mt-5">
							<div className="col-lg-3 mb-3">
								<ul
									className="nav nav-tabs flex-lg-column"
									role="tablist"
								>
									<li className="nav-item">
										<a
											className="nav-link active"
											id="profile-tab"
											data-toggle="tab"
											href="#profile"
											role="tab"
											aria-controls="profile"
											aria-selected="true"
										>
											Your Profile
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											id="password-tab"
											data-toggle="tab"
											href="#password"
											role="tab"
											aria-controls="password"
											aria-selected="false"
										>
											Password
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											id="notifications-tab"
											data-toggle="tab"
											href="#notifications"
											role="tab"
											aria-controls="notifications"
											aria-selected="false"
										>
											Email Notifications
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											id="billing-tab"
											data-toggle="tab"
											href="#billing"
											role="tab"
											aria-controls="billing"
											aria-selected="false"
										>
											Billing Details
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											id="integrations-tab"
											data-toggle="tab"
											href="#integrations"
											role="tab"
											aria-controls="integrations"
											aria-selected="false"
										>
											Integrations
										</a>
									</li>
								</ul>
							</div>
							<div className="col-xl-8 col-lg-9">
								<div className="card">
									<div className="card-body">
										<div className="tab-content">
											<div
												className="tab-pane fade show active"
												role="tabpanel"
												id="profile"
											>
												<div className="media mb-4">
													<img
														alt="Image"
														src="assets/img/avatar-male-4.jpg"
														className="avatar avatar-lg"
													/>
													<div className="media-body ml-3">
														<div className="custom-file custom-file-naked d-block mb-1">
															<input
																type="file"
																className="custom-file-input d-none"
																id="avatar-file"
															/>
															<label
																className="custom-file-label position-relative"
																htmlFor="avatar-file"
															>
																<span className="btn btn-primary">
																	Upload
																	avatar
																</span>
															</label>
														</div>
														<small>
															For best results,
															use an image at
															least 256px by 256px
															in either .jpg or
															.png format
														</small>
													</div>
												</div>
												{/*end of avatar*/}
												<form>
													<div className="form-group row align-items-center">
														<label className="col-3">
															First Name
														</label>
														<div className="col">
															<input
																type="text"
																placeholder="First name"
																defaultValue="David"
																name="profile-first-name"
																className="form-control"
																required
															/>
														</div>
													</div>
													<div className="form-group row align-items-center">
														<label className="col-3">
															Last Name
														</label>
														<div className="col">
															<input
																type="text"
																placeholder="First name"
																defaultValue="Whittaker"
																name="profile-last-name"
																className="form-control"
															/>
														</div>
													</div>
													<div className="form-group row align-items-center">
														<label className="col-3">
															Email
														</label>
														<div className="col">
															<input
																type="email"
																placeholder="Enter your email address"
																name="profile-email"
																className="form-control"
																required
															/>
														</div>
													</div>
													<div className="form-group row align-items-center">
														<label className="col-3">
															Location
														</label>
														<div className="col">
															<input
																type="text"
																placeholder="Enter your location"
																name="profile-location"
																className="form-control"
															/>
														</div>
													</div>
													<div className="form-group row">
														<label className="col-3">
															Bio
														</label>
														<div className="col">
															<textarea
																placeholder="Tell us a little about yourself"
																name="profile-bio"
																className="form-control"
																rows={4}
																defaultValue={
																	""
																}
															/>
															<small>
																This will be
																displayed on
																your public
																profile
															</small>
														</div>
													</div>
													<div className="d-flex justify-content-end">
														<button
															type="submit"
															className="btn btn-primary"
														>
															Save
														</button>
													</div>
												</form>
											</div>
											<div
												className="tab-pane fade"
												role="tabpanel"
												id="password"
											>
												<form>
													<div className="form-group row align-items-center">
														<label className="col-3">
															Current Password
														</label>
														<div className="col">
															<input
																type="password"
																placeholder="Enter your current password"
																name="password-current"
																className="form-control"
															/>
														</div>
													</div>
													<div className="form-group row align-items-center">
														<label className="col-3">
															New Password
														</label>
														<div className="col">
															<input
																type="password"
																placeholder="Enter a new password"
																name="password-new"
																className="form-control"
															/>
															<small>
																Password must be
																at least 8
																characters long
															</small>
														</div>
													</div>
													<div className="form-group row align-items-center">
														<label className="col-3">
															Confirm Password
														</label>
														<div className="col">
															<input
																type="password"
																placeholder="Confirm your new password"
																name="password-new-confirm"
																className="form-control"
															/>
														</div>
													</div>
													<div className="d-flex justify-content-end">
														<button
															type="submit"
															className="btn btn-primary"
														>
															Change Password
														</button>
													</div>
												</form>
											</div>
											<div
												className="tab-pane fade"
												role="tabpanel"
												id="notifications"
											>
												<form>
													<h6>
														Activity Notifications
													</h6>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-1"
																defaultChecked
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-1"
															>
																Someone assigns
																me to a task
															</label>
														</div>
													</div>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-2"
																defaultChecked
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-2"
															>
																Someone mentions
																me in a
																conversation
															</label>
														</div>
													</div>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-3"
																defaultChecked
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-3"
															>
																Someone adds me
																to a project
															</label>
														</div>
													</div>
													<div className="form-group mb-md-4">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-4"
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-4"
															>
																Activity on a
																project I am a
																member of
															</label>
														</div>
													</div>
													<h6>
														Service Notifications
													</h6>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-5"
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-5"
															>
																Monthly
																newsletter
															</label>
														</div>
													</div>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-6"
																defaultChecked
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-6"
															>
																Major feature
																enhancements
															</label>
														</div>
													</div>
													<div className="form-group">
														<div className="custom-control custom-checkbox custom-checkbox-switch">
															<input
																type="checkbox"
																className="custom-control-input"
																id="notify-7"
															/>
															<label
																className="custom-control-label"
																htmlFor="notify-7"
															>
																Minor updates
																and bug fixes
															</label>
														</div>
													</div>
													<div className="d-flex justify-content-end">
														<button
															type="submit"
															className="btn btn-primary"
														>
															Save preferences
														</button>
													</div>
												</form>
											</div>
											<div
												className="tab-pane fade"
												role="tabpanel"
												id="billing"
											>
												<form>
													<h6>Plan Details</h6>
													<div className="card text-center">
														<div className="card-body">
															<div className="row">
																<div className="col">
																	<div className="mb-4">
																		<h6>
																			Free
																		</h6>
																		<h5 className="display-4 d-block mb-2 font-weight-normal">
																			$0
																		</h5>
																		<span className="text-muted text-small">
																			Per
																			User
																			/
																			Per
																			Month
																		</span>
																	</div>
																	<ul className="list-unstyled">
																		<li>
																			Unlimited
																			projects
																		</li>
																		<li>
																			1
																			team
																		</li>
																		<li>
																			4
																			team
																			members
																		</li>
																	</ul>
																	<div className="custom-control custom-radio d-inline-block">
																		<input
																			type="radio"
																			id="plan-radio-1"
																			name="customRadio"
																			className="custom-control-input"
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor="plan-radio-1"
																		/>
																	</div>
																</div>
																<div className="col">
																	<div className="mb-4">
																		<h6>
																			Pro
																		</h6>
																		<h5 className="display-4 d-block mb-2 font-weight-normal">
																			$10
																		</h5>
																		<span className="text-muted text-small">
																			Per
																			User
																			/
																			Per
																			Month
																		</span>
																	</div>
																	<ul className="list-unstyled">
																		<li>
																			Unlimited
																			projects
																		</li>
																		<li>
																			Unlmited
																			teams
																		</li>
																		<li>
																			Unlimited
																			team
																			members
																		</li>
																	</ul>
																	<div className="custom-control custom-radio d-inline-block">
																		<input
																			type="radio"
																			id="plan-radio-2"
																			name="customRadio"
																			className="custom-control-input"
																			defaultChecked
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor="plan-radio-2"
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</form>
												<form className="mt-4">
													<h6>Payment Method</h6>
													<div className="card">
														<div className="card-body">
															<div className="row align-items-center">
																<div className="col-auto">
																	<div className="custom-control custom-radio d-inline-block">
																		<input
																			type="radio"
																			id="method-radio-1"
																			name="payment-method"
																			className="custom-control-input"
																			defaultChecked
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor="method-radio-1"
																		/>
																	</div>
																</div>
																<div className="col-auto">
																	<img
																		alt="Image"
																		src="assets/img/logo-payment-visa.svg"
																		className="avatar rounded-0"
																	/>
																</div>
																<div className="col d-flex align-items-center">
																	<span>
																		••••
																		••••
																		••••
																		8372
																	</span>
																	<small className="ml-2">
																		Exp:
																		06/21
																	</small>
																</div>
																<div className="col-auto">
																	<button className="btn btn-sm btn-danger">
																		Remove
																		Card
																	</button>
																</div>
															</div>
														</div>
													</div>
													<div className="card">
														<div className="card-body">
															<div className="row align-items-center">
																<div className="col-auto">
																	<div className="custom-control custom-radio d-inline-block">
																		<input
																			type="radio"
																			id="method-radio-2"
																			name="payment-method"
																			className="custom-control-input"
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor="method-radio-2"
																		/>
																	</div>
																</div>
																<div className="col-auto">
																	<img
																		alt="Image"
																		src="assets/img/logo-payment-amex.svg"
																		className="avatar rounded-0"
																	/>
																</div>
																<div className="col d-flex align-items-center">
																	<span>
																		••••
																		••••
																		••••
																		9918
																	</span>
																	<small className="ml-2">
																		Exp:
																		02/20
																	</small>
																</div>
																<div className="col-auto">
																	<button className="btn btn-sm btn-danger">
																		Remove
																		Card
																	</button>
																</div>
															</div>
														</div>
													</div>
													<div className="card">
														<div className="card-body">
															<div className="row align-items-center">
																<div className="col-auto">
																	<div className="custom-control custom-radio d-inline-block">
																		<input
																			type="radio"
																			id="method-radio-3"
																			name="payment-method"
																			className="custom-control-input"
																		/>
																		<label
																			className="custom-control-label"
																			htmlFor="method-radio-3"
																		/>
																	</div>
																</div>
																<div className="col-auto">
																	<img
																		alt="Image"
																		src="assets/img/logo-payment-paypal.svg"
																		className="avatar rounded-0"
																	/>
																</div>
																<div className="col d-flex align-items-center">
																	<span>
																		david.w@pipeline.io
																	</span>
																</div>
																<div className="col-auto">
																	<button className="btn btn-sm btn-primary">
																		Manage
																	</button>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
											<div
												className="tab-pane fade"
												role="tabpanel"
												id="integrations"
											>
												<div className="card">
													<div className="card-body">
														<div className="row align-items-center">
															<div className="col">
																<div className="media align-items-center">
																	<img
																		alt="Image"
																		src="assets/img/logo-integration-slack.svg"
																	/>
																	<div className="media-body ml-2">
																		<span className="h6 mb-0 d-block">
																			Slack
																		</span>
																		<span className="text-small text-muted">
																			Permissions:
																			Read,
																			Write,
																			Comment
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-auto">
																<button className="btn btn-sm btn-danger">
																	Revoke
																</button>
															</div>
														</div>
													</div>
												</div>
												<div className="card">
													<div className="card-body">
														<div className="row align-items-center">
															<div className="col">
																<div className="media align-items-center">
																	<img
																		alt="Image"
																		src="assets/img/logo-integration-dropbox.svg"
																	/>
																	<div className="media-body ml-2">
																		<span className="h6 mb-0 d-block">
																			Dropbox
																		</span>
																		<span className="text-small text-muted">
																			Permissions:
																			Read,
																			Write,
																			Upload
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-auto">
																<button className="btn btn-sm btn-danger">
																	Revoke
																</button>
															</div>
														</div>
													</div>
												</div>
												<div className="card">
													<div className="card-body">
														<div className="row align-items-center">
															<div className="col">
																<div className="media align-items-center">
																	<img
																		alt="Image"
																		src="assets/img/logo-integration-drive.svg"
																	/>
																	<div className="media-body ml-2">
																		<span className="h6 mb-0 d-block">
																			Google
																			Drive
																		</span>
																		<span className="text-small text-muted">
																			Permissions:
																			Read,
																			Write
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-auto">
																<button className="btn btn-sm btn-danger">
																	Revoke
																</button>
															</div>
														</div>
													</div>
												</div>
												<div className="card">
													<div className="card-body">
														<div className="row align-items-center">
															<div className="col">
																<div className="media align-items-center">
																	<img
																		alt="Image"
																		src="assets/img/logo-integration-trello.svg"
																	/>
																	<div className="media-body ml-2">
																		<span className="h6 mb-0 d-block">
																			Trello
																		</span>
																		<span className="text-small text-muted">
																			Permissions:
																			Read,
																			Write
																		</span>
																	</div>
																</div>
															</div>
															<div className="col-auto">
																<button className="btn btn-sm btn-danger">
																	Revoke
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
