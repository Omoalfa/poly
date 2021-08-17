import Head from "next/head";
import { Navbar, Login } from "../index";
import { parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { validateAccess } from "./../../redux/actions/task/taskAction";
import CreateAcc from "../CreateAcc";
import SignIn from "../SignIn";
import Profile from "../profile";
import EditProfile from "../EditProfile";

const MainLayout = (props) => {
	const { authorization } = parseCookies();
	const dispatch = useDispatch();
	const [component, setComponent] = useState({ component: `login` });
	const clickHandler = (res) => {
		let currentcomponent;
		if (res === `home`) currentcomponent = `home`;
		else if (res === `signin`) currentcomponent = `signin`;
		else if (res === `profile`) currentcomponent = `profile`;
		else if (res === `edit`) currentcomponent = `edit`;
		else currentcomponent = `login`;

		setComponent({ component: currentcomponent });
	};

	let Component;

	if (component.component === `home`) Component = <CreateAcc />;
	else if (component.component === `signin`)
		Component = <SignIn clicked={clickHandler} />;
	else if (component.component === `profile`) Component = <Profile />;
	else if (component.component === `edit`) Component = <EditProfile />;
	else Component = <Login />;

	useEffect(() => {
		dispatch(validateAccess());
	});

	return !authorization ? (
		<>
			<Head>
				<title>Poly186 Alpha</title>
				<link
					href="assets/img/favicon.ico"
					rel="icon"
					type="image/x-icon"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="description"
					content="This project management system is for our decentralized community to use in self-organizing itself towards building, maintaining, and deploying Poly186."
				/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Gothic+A1"
					rel="stylesheet"
				/>
				<link
					href="assets/css/theme.css"
					rel="stylesheet"
					type="text/css"
					media="all"
				/>
			</Head>
			<Navbar clicked={clickHandler} />
			<div id="content" className="main-content">
				{/* {click.click ? <CreateAcc /> : <Login />} */}
				{Component}
			</div>
		</>
	) : (
		<div>
			<Head>
				<title>Poly186 Alpha</title>
				<link
					href="assets/img/favicon.ico"
					rel="icon"
					type="image/x-icon"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="description"
					content="This project management system is for our decentralized community to use in self-organizing itself towards building, maintaining, and deploying Poly186."
				/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Gothic+A1"
					rel="stylesheet"
				/>
				<link
					href="assets/css/theme.css"
					rel="stylesheet"
					type="text/css"
					media="all"
				/>
			</Head>
			<>
				<Navbar />
				<div id="content" className="main-content">
					{props.children}
				</div>
			</>
		</div>
	);
};

export default MainLayout;
