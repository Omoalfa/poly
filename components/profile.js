import React from "react";

const Profile = () => {
	return (
		<div>
			<div className="layout layout-nav-side">
				<div className="main-container">
					<div className="navbar bg-white breadcrumb-bar">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="index.html">Overview</a>
								</li>
								<li className="breadcrumb-item">
									<a href="pages-app.html#">App Pages</a>
								</li>
								<li
									className="breadcrumb-item active"
									aria-current="page"
								>
									User
								</li>
							</ol>
						</nav>
						<div className="dropdown">
							<button
								className="btn btn-round"
								role="button"
								data-toggle="dropdown"
								aria-expanded="false"
							>
								<i className="material-icons">settings</i>
							</button>
							<div className="dropdown-menu dropdown-menu-right">
								<a className="dropdown-item" href="#">
									Account Settings
								</a>
								<div className="dropdown-divider" />
								<a
									className="dropdown-item text-danger"
									href="#"
								>
									Log out
								</a>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-11 col-xl-10">
								<div className="page-header mb-4">
									<div className="media">
										<img
											alt="Image"
											src="assets/img/avatar-male-4.jpg"
											className="avatar avatar-lg mt-1"
										/>
										<div className="media-body ml-3">
											<h1 className="mb-0">
												David Whittaker
											</h1>
											<p className="lead">
												Interface designer and front-end
												developer
											</p>
										</div>
									</div>
								</div>
								<ul
									className="nav nav-tabs nav-fill"
									role="tablist"
								>
									<li className="nav-item">
										<a
											className="nav-link active"
											data-toggle="tab"
											href="#teams"
											role="tab"
											aria-controls="teams"
											aria-selected="true"
										>
											Teams
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											data-toggle="tab"
											href="#projects"
											role="tab"
											aria-controls="projects"
											aria-selected="false"
										>
											Projects
										</a>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											data-toggle="tab"
											href="#tasks"
											role="tab"
											aria-controls="tasks"
											aria-selected="false"
										>
											Tasks
										</a>
									</li>
								</ul>
								<div className="tab-content">
									<div
										className="tab-pane fade show active"
										id="teams"
										role="tabpanel"
										data-filter-list="content-list-body"
									>
										<div className="row content-list-head">
											<div className="col-auto">
												<h3>Teams</h3>
												<button
													className="btn btn-round"
													data-toggle="modal"
													data-target="#team-add-modal"
												>
													<i className="material-icons">
														add
													</i>
												</button>
											</div>
											<form className="col-md-auto">
												<div className="input-group input-group-round">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="material-icons">
																filter_list
															</i>
														</span>
													</div>
													<input
														type="search"
														className="form-control filter-list-input"
														placeholder="Filter teams"
														aria-label="Filter teams"
													/>
												</div>
											</form>
										</div>
										<div className="content-list-body row">
											<div className="col-md-6">
												<div className="card card-team">
													<div className="card-body">
														<div className="dropdown card-options">
															<button
																className="btn-options"
																type="button"
																data-toggle="dropdown"
																aria-haspopup="true"
																aria-expanded="false"
															>
																<i className="material-icons">
																	more_vert
																</i>
															</button>
															<div className="dropdown-menu dropdown-menu-right">
																<a
																	className="dropdown-item"
																	href="#"
																>
																	Manage
																</a>
																<div className="dropdown-divider" />
																<a
																	className="dropdown-item text-danger"
																	href="#"
																>
																	Leave Team
																</a>
															</div>
														</div>
														<div className="card-title">
															<a href="#">
																<h5 data-filter-by="text">
																	Medium Rare
																</h5>
															</a>
															<span>
																4 Projects, 6
																Members
															</span>
														</div>
														<ul className="avatars">
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Kenny"
																>
																	<img
																		alt="Kenny Tran"
																		className="avatar"
																		src="assets/img/avatar-male-6.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="David"
																>
																	<img
																		alt="David Whittaker"
																		className="avatar"
																		src="assets/img/avatar-male-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Sally"
																>
																	<img
																		alt="Sally Harper"
																		className="avatar"
																		src="assets/img/avatar-female-3.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Kristina"
																>
																	<img
																		alt="Kristina Van Der Stroem"
																		className="avatar"
																		src="assets/img/avatar-female-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Claire"
																>
																	<img
																		alt="Claire Connors"
																		className="avatar"
																		src="assets/img/avatar-female-1.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Marcus"
																>
																	<img
																		alt="Marcus Simmons"
																		className="avatar"
																		src="assets/img/avatar-male-1.jpg"
																	/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card card-team">
													<div className="card-body">
														<div className="dropdown card-options">
															<button
																className="btn-options"
																type="button"
																data-toggle="dropdown"
																aria-haspopup="true"
																aria-expanded="false"
															>
																<i className="material-icons">
																	more_vert
																</i>
															</button>
															<div className="dropdown-menu dropdown-menu-right">
																<a
																	className="dropdown-item"
																	href="#"
																>
																	Manage
																</a>
																<div className="dropdown-divider" />
																<a
																	className="dropdown-item text-danger"
																	href="#"
																>
																	Leave Team
																</a>
															</div>
														</div>
														<div className="card-title">
															<a href="#">
																<h5 data-filter-by="text">
																	Front-Enders
																</h5>
															</a>
															<span>
																2 Projects, 3
																Members
															</span>
														</div>
														<ul className="avatars">
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="David"
																>
																	<img
																		alt="David Whittaker"
																		className="avatar"
																		src="assets/img/avatar-male-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Krishna"
																>
																	<img
																		alt="Krishna Bajaj"
																		className="avatar"
																		src="assets/img/avatar-female-6.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Peggy"
																>
																	<img
																		alt="Peggy Brown"
																		className="avatar"
																		src="assets/img/avatar-female-2.jpg"
																	/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card card-team">
													<div className="card-body">
														<div className="dropdown card-options">
															<button
																className="btn-options"
																type="button"
																data-toggle="dropdown"
																aria-haspopup="true"
																aria-expanded="false"
															>
																<i className="material-icons">
																	more_vert
																</i>
															</button>
															<div className="dropdown-menu dropdown-menu-right">
																<a
																	className="dropdown-item"
																	href="#"
																>
																	Manage
																</a>
																<div className="dropdown-divider" />
																<a
																	className="dropdown-item text-danger"
																	href="#"
																>
																	Leave Team
																</a>
															</div>
														</div>
														<div className="card-title">
															<a href="#">
																<h5 data-filter-by="text">
																	Pipeline
																	Leadership
																</h5>
															</a>
															<span>
																4 Projects, 9
																Members
															</span>
														</div>
														<ul className="avatars">
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Marcus"
																>
																	<img
																		alt="Marcus Simmons"
																		className="avatar"
																		src="assets/img/avatar-male-1.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Claire"
																>
																	<img
																		alt="Claire Connors"
																		className="avatar"
																		src="assets/img/avatar-female-1.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Harry"
																>
																	<img
																		alt="Harry Xai"
																		className="avatar"
																		src="assets/img/avatar-male-2.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Kristina"
																>
																	<img
																		alt="Kristina Van Der Stroem"
																		className="avatar"
																		src="assets/img/avatar-female-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Kenny"
																>
																	<img
																		alt="Kenny Tran"
																		className="avatar"
																		src="assets/img/avatar-male-6.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Sally"
																>
																	<img
																		alt="Sally Harper"
																		className="avatar"
																		src="assets/img/avatar-female-3.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="David"
																>
																	<img
																		alt="David Whittaker"
																		className="avatar"
																		src="assets/img/avatar-male-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Ravi"
																>
																	<img
																		alt="Ravi Singh"
																		className="avatar"
																		src="assets/img/avatar-male-3.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Masimba"
																>
																	<img
																		alt="Masimba Sibanda"
																		className="avatar"
																		src="assets/img/avatar-male-5.jpg"
																	/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card card-team">
													<div className="card-body">
														<div className="dropdown card-options">
															<button
																className="btn-options"
																type="button"
																data-toggle="dropdown"
																aria-haspopup="true"
																aria-expanded="false"
															>
																<i className="material-icons">
																	more_vert
																</i>
															</button>
															<div className="dropdown-menu dropdown-menu-right">
																<a
																	className="dropdown-item"
																	href="#"
																>
																	Manage
																</a>
																<div className="dropdown-divider" />
																<a
																	className="dropdown-item text-danger"
																	href="#"
																>
																	Leave Team
																</a>
															</div>
														</div>
														<div className="card-title">
															<a href="#">
																<h5 data-filter-by="text">
																	User
																	Experience
																</h5>
															</a>
															<span>
																5 Projects, 4
																Members
															</span>
														</div>
														<ul className="avatars">
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="David"
																>
																	<img
																		alt="David Whittaker"
																		className="avatar"
																		src="assets/img/avatar-male-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Peggy"
																>
																	<img
																		alt="Peggy Brown"
																		className="avatar"
																		src="assets/img/avatar-female-2.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Kristina"
																>
																	<img
																		alt="Kristina Van Der Stroem"
																		className="avatar"
																		src="assets/img/avatar-female-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Ravi"
																>
																	<img
																		alt="Ravi Singh"
																		className="avatar"
																		src="assets/img/avatar-male-3.jpg"
																	/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="card card-team">
													<div className="card-body">
														<div className="dropdown card-options">
															<button
																className="btn-options"
																type="button"
																data-toggle="dropdown"
																aria-haspopup="true"
																aria-expanded="false"
															>
																<i className="material-icons">
																	more_vert
																</i>
															</button>
															<div className="dropdown-menu dropdown-menu-right">
																<a
																	className="dropdown-item"
																	href="#"
																>
																	Manage
																</a>
																<div className="dropdown-divider" />
																<a
																	className="dropdown-item text-danger"
																	href="#"
																>
																	Leave Team
																</a>
															</div>
														</div>
														<div className="card-title">
															<a href="#">
																<h5 data-filter-by="text">
																	Founders
																</h5>
															</a>
															<span>
																3 Projects, 2
																Members
															</span>
														</div>
														<ul className="avatars">
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="David"
																>
																	<img
																		alt="David Whittaker"
																		className="avatar"
																		src="assets/img/avatar-male-4.jpg"
																	/>
																</a>
															</li>
															<li>
																<a
																	href="#"
																	data-toggle="tooltip"
																	title="Marcus"
																>
																	<img
																		alt="Marcus Simmons"
																		className="avatar"
																		src="assets/img/avatar-male-1.jpg"
																	/>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										className="tab-pane fade"
										id="projects"
										role="tabpanel"
										data-filter-list="content-list-body"
									>
										<div className="content-list">
											<div className="row content-list-head">
												<div className="col-auto">
													<h3>Projects</h3>
												</div>
												<form className="col-md-auto">
													<div className="input-group input-group-round">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="material-icons">
																	filter_list
																</i>
															</span>
														</div>
														<input
															type="search"
															className="form-control filter-list-input"
															placeholder="Filter projects"
															aria-label="Filter Projects"
														/>
													</div>
												</form>
											</div>
											<div className="content-list-body row">
												<div className="col-lg-6">
													<div className="card card-project">
														<div className="card-body">
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="project-dropdown-button-4"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Edit
																	</a>
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Share
																	</a>
																</div>
															</div>
															<div className="card-title">
																<a href="#">
																	<h5 data-filter-by="text">
																		Update
																		Marketing
																		Collateral
																	</h5>
																</a>
															</div>
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="David"
																	>
																		<img
																			alt="David Whittaker"
																			className="avatar"
																			src="assets/img/avatar-male-4.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Masimba"
																	>
																		<img
																			alt="Masimba Sibanda"
																			className="avatar"
																			src="assets/img/avatar-male-5.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Krishna"
																	>
																		<img
																			alt="Krishna Bajaj"
																			className="avatar"
																			src="assets/img/avatar-female-6.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Harry"
																	>
																		<img
																			alt="Harry Xai"
																			className="avatar"
																			src="assets/img/avatar-male-2.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
															</ul>
															<div className="card-meta d-flex justify-content-between">
																<div className="d-flex align-items-center">
																	<i className="material-icons mr-1">
																		playlist_add_check
																	</i>
																	<span className="text-small">
																		0/5
																	</span>
																</div>
																<span
																	className="text-small"
																	data-filter-by="text"
																>
																	Due 12 days
																</span>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="card card-project">
														<div className="progress">
															<div
																className="progress-bar bg-success"
																role="progressbar"
																style={{
																	width: "8%"
																}}
																aria-valuenow={
																	8
																}
																aria-valuemin={
																	0
																}
																aria-valuemax={
																	100
																}
															/>
														</div>
														<div className="card-body">
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="project-dropdown-button-5"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Edit
																	</a>
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Share
																	</a>
																</div>
															</div>
															<div className="card-title">
																<a href="#">
																	<h5 data-filter-by="text">
																		Brand
																		Concept
																		&amp;
																		Design
																	</h5>
																</a>
															</div>
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Ravi"
																	>
																		<img
																			alt="Ravi Singh"
																			className="avatar"
																			src="assets/img/avatar-male-3.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Masimba"
																	>
																		<img
																			alt="Masimba Sibanda"
																			className="avatar"
																			src="assets/img/avatar-male-5.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Peggy"
																	>
																		<img
																			alt="Peggy Brown"
																			className="avatar"
																			src="assets/img/avatar-female-2.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Marcus"
																	>
																		<img
																			alt="Marcus Simmons"
																			className="avatar"
																			src="assets/img/avatar-male-1.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Kerri-Anne"
																	>
																		<img
																			alt="Kerri-Anne Banks"
																			className="avatar"
																			src="assets/img/avatar-female-5.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Claire"
																	>
																		<img
																			alt="Claire Connors"
																			className="avatar"
																			src="assets/img/avatar-female-1.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
															</ul>
															<div className="card-meta d-flex justify-content-between">
																<div className="d-flex align-items-center">
																	<i className="material-icons mr-1">
																		playlist_add_check
																	</i>
																	<span className="text-small">
																		1/12
																	</span>
																</div>
																<span
																	className="text-small"
																	data-filter-by="text"
																>
																	Due 20 days
																</span>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="card card-project">
														<div className="card-body">
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="project-dropdown-button-6"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Edit
																	</a>
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Share
																	</a>
																</div>
															</div>
															<div className="card-title">
																<a href="#">
																	<h5 data-filter-by="text">
																		Company
																		Getaway
																	</h5>
																</a>
															</div>
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Claire"
																	>
																		<img
																			alt="Claire Connors"
																			className="avatar"
																			src="assets/img/avatar-female-1.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Kristina"
																	>
																		<img
																			alt="Kristina Van Der Stroem"
																			className="avatar"
																			src="assets/img/avatar-female-4.jpg"
																			data-filter-by="alt"
																		/>
																	</a>
																</li>
															</ul>
															<div className="card-meta d-flex justify-content-between">
																<div className="d-flex align-items-center">
																	<i className="material-icons mr-1">
																		playlist_add_check
																	</i>
																	<span className="text-small">
																		-/-
																	</span>
																</div>
																<span
																	className="text-small"
																	data-filter-by="text"
																>
																	Unscheduled
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										className="tab-pane fade"
										id="tasks"
										role="tabpanel"
										data-filter-list="content-list-body"
									>
										<div className="row content-list-head">
											<div className="col-auto">
												<h3>Tasks</h3>
											</div>
											<form className="col-md-auto">
												<div className="input-group input-group-round">
													<div className="input-group-prepend">
														<span className="input-group-text">
															<i className="material-icons">
																filter_list
															</i>
														</span>
													</div>
													<input
														type="search"
														className="form-control filter-list-input"
														placeholder="Filter tasks"
														aria-label="Filter Tasks"
													/>
												</div>
											</form>
										</div>
										<div className="content-list-body row">
											<div className="col-12">
												<div className="card card-task">
													<div className="progress">
														<div
															className="progress-bar bg-danger"
															role="progressbar"
															style={{
																width: "75%"
															}}
															aria-valuenow={25}
															aria-valuemin={0}
															aria-valuemax={100}
														/>
													</div>
													<div className="card-body">
														<div className="card-title">
															<a href="#">
																<h6 data-filter-by="text">
																	Client
																	objective
																	meeting
																</h6>
															</a>
															<span className="text-small">
																Today
															</span>
														</div>
														<div className="card-meta">
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Kenny"
																	>
																		<img
																			alt="Kenny Tran"
																			className="avatar"
																			src="assets/img/avatar-male-6.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="David"
																	>
																		<img
																			alt="David Whittaker"
																			className="avatar"
																			src="assets/img/avatar-male-4.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Sally"
																	>
																		<img
																			alt="Sally Harper"
																			className="avatar"
																			src="assets/img/avatar-female-3.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Kristina"
																	>
																		<img
																			alt="Kristina Van Der Stroem"
																			className="avatar"
																			src="assets/img/avatar-female-4.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Claire"
																	>
																		<img
																			alt="Claire Connors"
																			className="avatar"
																			src="assets/img/avatar-female-1.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Marcus"
																	>
																		<img
																			alt="Marcus Simmons"
																			className="avatar"
																			src="assets/img/avatar-male-1.jpg"
																		/>
																	</a>
																</li>
															</ul>
															<div className="d-flex align-items-center">
																<i className="material-icons">
																	playlist_add_check
																</i>
																<span>3/4</span>
															</div>
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="task-dropdown-button-1"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Mark as
																		done
																	</a>
																	<div className="dropdown-divider" />
																	<a
																		className="dropdown-item text-danger"
																		href="#"
																	>
																		Archive
																	</a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card card-task">
													<div className="progress">
														<div
															className="progress-bar bg-warning"
															role="progressbar"
															style={{
																width: "20%"
															}}
															aria-valuenow={25}
															aria-valuemin={0}
															aria-valuemax={100}
														/>
													</div>
													<div className="card-body">
														<div className="card-title">
															<a href="#">
																<h6 data-filter-by="text">
																	Target
																	market trend
																	analysis
																</h6>
															</a>
															<span className="text-small">
																5 days
															</span>
														</div>
														<div className="card-meta">
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Peggy"
																	>
																		<img
																			alt="Peggy Brown"
																			className="avatar"
																			src="assets/img/avatar-female-2.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="David"
																	>
																		<img
																			alt="David Whittaker"
																			className="avatar"
																			src="assets/img/avatar-male-4.jpg"
																		/>
																	</a>
																</li>
															</ul>
															<div className="d-flex align-items-center">
																<i className="material-icons">
																	playlist_add_check
																</i>
																<span>
																	2/10
																</span>
															</div>
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="task-dropdown-button-2"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Mark as
																		done
																	</a>
																	<div className="dropdown-divider" />
																	<a
																		className="dropdown-item text-danger"
																		href="#"
																	>
																		Archive
																	</a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="card card-task">
													<div className="progress">
														<div
															className="progress-bar bg-success"
															role="progressbar"
															style={{
																width: "0%"
															}}
															aria-valuenow={25}
															aria-valuemin={0}
															aria-valuemax={100}
														/>
													</div>
													<div className="card-body">
														<div className="card-title">
															<a href="#">
																<h6 data-filter-by="text">
																	Assemble
																	Outcomes
																	Report for
																	client
																</h6>
															</a>
															<span className="text-small">
																7 days
															</span>
														</div>
														<div className="card-meta">
															<ul className="avatars">
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Marcus"
																	>
																		<img
																			alt="Marcus Simmons"
																			className="avatar"
																			src="assets/img/avatar-male-1.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="Claire"
																	>
																		<img
																			alt="Claire Connors"
																			className="avatar"
																			src="assets/img/avatar-female-1.jpg"
																		/>
																	</a>
																</li>
																<li>
																	<a
																		href="#"
																		data-toggle="tooltip"
																		title="David"
																	>
																		<img
																			alt="David Whittaker"
																			className="avatar"
																			src="assets/img/avatar-male-4.jpg"
																		/>
																	</a>
																</li>
															</ul>
															<div className="d-flex align-items-center">
																<i className="material-icons">
																	playlist_add_check
																</i>
																<span>0/6</span>
															</div>
															<div className="dropdown card-options">
																<button
																	className="btn-options"
																	type="button"
																	id="task-dropdown-button-3"
																	data-toggle="dropdown"
																	aria-haspopup="true"
																	aria-expanded="false"
																>
																	<i className="material-icons">
																		more_vert
																	</i>
																</button>
																<div className="dropdown-menu dropdown-menu-right">
																	<a
																		className="dropdown-item"
																		href="#"
																	>
																		Mark as
																		done
																	</a>
																	<div className="dropdown-divider" />
																	<a
																		className="dropdown-item text-danger"
																		href="#"
																	>
																		Archive
																	</a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<form
									className="modal fade"
									id="team-add-modal"
									tabIndex={-1}
									aria-hidden="true"
								>
									<div
										className="modal-dialog"
										role="document"
									>
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title">
													New Team
												</h5>
												<button
													type="button"
													className="close btn btn-round"
													data-dismiss="modal"
													aria-label="Close"
												>
													<i className="material-icons">
														close
													</i>
												</button>
											</div>
											<ul
												className="nav nav-tabs nav-fill"
												role="tablist"
											>
												<li className="nav-item">
													<a
														className="nav-link active"
														id="team-add-details-tab"
														data-toggle="tab"
														href="#team-add-details"
														role="tab"
														aria-controls="team-add-details"
														aria-selected="true"
													>
														Details
													</a>
												</li>
												<li className="nav-item">
													<a
														className="nav-link"
														id="team-add-members-tab"
														data-toggle="tab"
														href="#team-add-members"
														role="tab"
														aria-controls="team-add-members"
														aria-selected="false"
													>
														Members
													</a>
												</li>
											</ul>
											<div className="modal-body">
												<div className="tab-content">
													<div
														className="tab-pane fade show active"
														id="team-add-details"
														role="tabpanel"
													>
														<h6>Team Details</h6>
														<div className="form-group row align-items-center">
															<label className="col-3">
																Name
															</label>
															<input
																className="form-control col"
																type="text"
																placeholder="Team name"
																name="team-name"
															/>
														</div>
														<div className="form-group row">
															<label className="col-3">
																Description
															</label>
															<textarea
																className="form-control col"
																rows={3}
																placeholder="Team description"
																name="team-description"
																defaultValue={
																	""
																}
															/>
														</div>
													</div>
													<div
														className="tab-pane fade"
														id="team-add-members"
														role="tabpanel"
													>
														<div
															className="users-manage"
															data-filter-list="form-group-users"
														>
															<div className="mb-3">
																<ul className="avatars text-center">
																	<li>
																		<img
																			alt="Claire Connors"
																			src="assets/img/avatar-female-1.jpg"
																			className="avatar"
																			data-toggle="tooltip"
																			data-title="Claire Connors"
																		/>
																	</li>
																	<li>
																		<img
																			alt="Marcus Simmons"
																			src="assets/img/avatar-male-1.jpg"
																			className="avatar"
																			data-toggle="tooltip"
																			data-title="Marcus Simmons"
																		/>
																	</li>
																	<li>
																		<img
																			alt="Peggy Brown"
																			src="assets/img/avatar-female-2.jpg"
																			className="avatar"
																			data-toggle="tooltip"
																			data-title="Peggy Brown"
																		/>
																	</li>
																	<li>
																		<img
																			alt="Harry Xai"
																			src="assets/img/avatar-male-2.jpg"
																			className="avatar"
																			data-toggle="tooltip"
																			data-title="Harry Xai"
																		/>
																	</li>
																</ul>
															</div>
															<div className="input-group input-group-round">
																<div className="input-group-prepend">
																	<span className="input-group-text">
																		<i className="material-icons">
																			filter_list
																		</i>
																	</span>
																</div>
																<input
																	type="search"
																	className="form-control filter-list-input"
																	placeholder="Filter members"
																	aria-label="Filter Members"
																/>
															</div>
															<div className="form-group-users">
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-1"
																		defaultChecked
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-1"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Claire Connors"
																				src="assets/img/avatar-female-1.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Claire
																				Connors
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-2"
																		defaultChecked
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-2"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Marcus Simmons"
																				src="assets/img/avatar-male-1.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Marcus
																				Simmons
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-3"
																		defaultChecked
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-3"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Peggy Brown"
																				src="assets/img/avatar-female-2.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Peggy
																				Brown
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-4"
																		defaultChecked
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-4"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Harry Xai"
																				src="assets/img/avatar-male-2.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Harry
																				Xai
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-5"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-5"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Sally Harper"
																				src="assets/img/avatar-female-3.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Sally
																				Harper
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-6"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-6"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Ravi Singh"
																				src="assets/img/avatar-male-3.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Ravi
																				Singh
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-7"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-7"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Kristina Van Der Stroem"
																				src="assets/img/avatar-female-4.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Kristina
																				Van
																				Der
																				Stroem
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-8"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-8"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="David Whittaker"
																				src="assets/img/avatar-male-4.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				David
																				Whittaker
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-9"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-9"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Kerri-Anne Banks"
																				src="assets/img/avatar-female-5.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Kerri-Anne
																				Banks
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-10"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-10"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Masimba Sibanda"
																				src="assets/img/avatar-male-5.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Masimba
																				Sibanda
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-11"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-11"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Krishna Bajaj"
																				src="assets/img/avatar-female-6.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Krishna
																				Bajaj
																			</span>
																		</span>
																	</label>
																</div>
																<div className="custom-control custom-checkbox">
																	<input
																		type="checkbox"
																		className="custom-control-input"
																		id="user-manage-12"
																	/>
																	<label
																		className="custom-control-label"
																		htmlFor="user-manage-12"
																	>
																		<span className="d-flex align-items-center">
																			<img
																				alt="Kenny Tran"
																				src="assets/img/avatar-male-6.jpg"
																				className="avatar mr-2"
																			/>
																			<span
																				className="h6 mb-0"
																				data-filter-by="text"
																			>
																				Kenny
																				Tran
																			</span>
																		</span>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="modal-footer">
												<button
													role="button"
													className="btn btn-primary"
													type="submit"
												>
													Done
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<button
						className="btn btn-primary btn-round btn-floating btn-lg"
						type="button"
						data-toggle="collapse"
						data-target="#floating-chat"
						aria-expanded="false"
					>
						<i className="material-icons">chat_bubble</i>
						<i className="material-icons">close</i>
					</button>
					<div
						className="collapse sidebar-floating"
						id="floating-chat"
					>
						<div className="sidebar-content">
							<div
								className="chat-module"
								data-filter-list="chat-module-body"
							>
								<div className="chat-module-top">
									<form>
										<div className="input-group input-group-round">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="material-icons">
														search
													</i>
												</span>
											</div>
											<input
												type="search"
												className="form-control filter-list-input"
												placeholder="Search chat"
												aria-label="Search Chat"
											/>
										</div>
									</form>
									<div className="chat-module-body">
										<div className="media chat-item">
											<img
												alt="Claire"
												src="assets/img/avatar-female-1.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Claire
													</span>
													<span data-filter-by="text">
														4 days ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Hey guys, just kicking
														things off here in the
														chat window. Hope you're
														all ready to tackle this
														great project. Let's
														smash some Brand Concept
														&amp; Design!
													</p>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Peggy"
												src="assets/img/avatar-female-2.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Peggy
													</span>
													<span data-filter-by="text">
														4 days ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Nice one{"{"}" "{"}"}
														<a href="#">@Claire</a>,
														we've got some killer
														ideas kicking about
														already.
														<img
															src="https://media.giphy.com/media/aTeHNLRLrwwwM/giphy.gif"
															alt="alt text"
															title="Thinking"
														/>
													</p>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Marcus"
												src="assets/img/avatar-male-1.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Marcus
													</span>
													<span data-filter-by="text">
														3 days ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Roger that boss!{"{"}" "
														{"}"}
														<a href>@Ravi</a> and I
														have already started
														gathering some stuff for
														the mood boards, excited
														to start! 🔥
													</p>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Ravi"
												src="assets/img/avatar-male-3.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Ravi
													</span>
													<span data-filter-by="text">
														3 days ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<h1>😉</h1>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Claire"
												src="assets/img/avatar-female-1.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Claire
													</span>
													<span data-filter-by="text">
														2 days ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Can't wait!{"{"}" "{"}"}
														<a href="#">@David</a>
														{"{"}" "{"}"}
														how are we coming along
														with the{"{"}" "{"}"}
														<a href="#">
															Client Objective
															Meeting
														</a>
														?
													</p>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="David"
												src="assets/img/avatar-male-4.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														David
													</span>
													<span data-filter-by="text">
														Yesterday
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Coming along nicely,
														we've got a draft for
														the client questionnaire
														completed, take a look!
														🤓
													</p>
												</div>
												<div className="media media-attachment">
													<div className="avatar bg-primary">
														<i className="material-icons">
															insert_drive_file
														</i>
													</div>
													<div className="media-body">
														<a
															href="#"
															data-filter-by="text"
														>
															questionnaire-draft.doc
														</a>
														<span data-filter-by="text">
															24kb Document
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Sally"
												src="assets/img/avatar-female-3.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Sally
													</span>
													<span data-filter-by="text">
														2 hours ago
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Great start guys, I've
														added some notes to the
														task. We may need to
														make some adjustments to
														the last couple of items
														- but no biggie!
													</p>
												</div>
											</div>
										</div>
										<div className="media chat-item">
											<img
												alt="Peggy"
												src="assets/img/avatar-female-2.jpg"
												className="avatar"
											/>
											<div className="media-body">
												<div className="chat-item-title">
													<span
														className="chat-item-author"
														data-filter-by="text"
													>
														Peggy
													</span>
													<span data-filter-by="text">
														Just now
													</span>
												</div>
												<div
													className="chat-item-body"
													data-filter-by="text"
												>
													<p>
														Well done{"{"}" "{"}"}
														<a href="#">@all</a>.
														See you all at 2 for the
														kick-off meeting. 🤜
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="chat-module-bottom">
									<form className="chat-form">
										<textarea
											className="form-control"
											placeholder="Type message"
											rows={1}
											defaultValue={""}
										/>
										<div className="chat-form-buttons">
											<button
												type="button"
												className="btn btn-link"
											>
												<i className="material-icons">
													tag_faces
												</i>
											</button>
											<div className="custom-file custom-file-naked">
												<input
													type="file"
													className="custom-file-input"
													id="customFile"
												/>
												<label
													className="custom-file-label"
													htmlFor="customFile"
												>
													<i className="material-icons">
														attach_file
													</i>
												</label>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
