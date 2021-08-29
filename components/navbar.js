import Link from "next/link";
import classes from "./style/style.module.css";
import { destroyCookie } from 'nookies'

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="layout layout-nav-top">
				<div className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
					<Link className='nav-link' href="/">
						<img
							alt="Pipeline"
							src="assets/img/PolyLogo1.png"
							style={{
								width: 30,
								height: 30,
								borderRadius: "50%"
							}}
						/>
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
									<a className='nav-link'>Home</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="https://knowledge-base.poly186.io">
									<a className='nav-link'>Knowledge Base</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link className='nav-link' href="https://ico.poly186.io">
									<a className='nav-link'>ICO</a>
								</Link>
							</li>

							<div className={classes[`mobile-nav`]}>
								<ul className="navbar-nav">
									{
										this.props.auth ?
										<>
											<li className="nav-item">
												<Link href="/editprofile">
													<a  className='nav-link'>
														Edit Profile
													</a>
												</Link>
											</li>
											<li className='nav-item'>
												<Link href='/'>
													<a className='nav-link' onClick={() => destroyCookie(null, 'authorization')}>Log Out</a>
												</Link>
											</li>
										</> 
										:
										<>
										<li className="nav-item">
												<Link href="/login">
													<a  className='nav-link'>
														Log In
													</a>
												</Link>
											</li>
											<li className="nav-item">
											<Link href="/register">
												<a  className='nav-link'>
													Register
												</a>
											</Link>
										</li>
										</>
									}
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
