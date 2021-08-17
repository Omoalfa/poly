import Link from "next/link";
import classes from "./style/style.module.css";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="layout layout-nav-top">
				<div className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
					<Link href="/">
						<a
							className="navbar-brand"
							onClick={this.props.clicked.bind(this, "login")}
						>
							<img
								alt="Pipeline"
								src="assets/img/PolyLogo1.png"
								style={{
									width: 30,
									height: 30,
									borderRadius: "50%"
								}}
							/>
						</a>
					</Link>
					<div className="d-flex align-items-center">
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbar-collapse"
							aria-controls="navbar-collapse"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
					</div>
					<div
						className="collapse navbar-collapse justify-content-between"
						id="navbar-collapse"
					>
						<ul className="navbar-nav" style={{ flex: 1 }}>
							<li className="nav-item">
								<Link href="/">
									<a
										className="nav-link"
										onClick={this.props.clicked.bind(
											this,
											"home"
										)}
									>
										Home
									</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="https://knowledge-base.poly186.io">
									<a className="nav-link" target="_blank">
										Knowledge Base
									</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="https://ico.poly186.io">
									<a className="nav-link" target="_blank">
										ICO
									</a>
								</Link>
							</li>
							{/* <div
								style={{ marginLeft: `auto`, display: `flex` }}
							> */}
							<div className={classes[`mobile-nav`]}>
								<ul className="navbar-nav">
									<li className="nav-item">
										<Link href="/">
											<a
												className="nav-link"
												onClick={this.props.clicked.bind(
													this,
													"edit"
												)}
											>
												Edit Profile
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/">
											<a
												className="nav-link"
												onClick={this.props.clicked.bind(
													this,
													"signin"
												)}
											>
												Log In
											</a>
										</Link>
									</li>
								</ul>
							</div>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
