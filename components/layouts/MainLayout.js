import Head from "next/head";
import { Navbar } from "../index";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useRouter } from 'next/router'

const MainLayout = (props) => {
	const { authorization } = parseCookies();
	const route = useRouter()

	const isPublic = (route) => {
		const publicRoutes = ['/login', '/forgotpassword', '/register']

		return publicRoutes.includes(route)
	}

	useEffect(() => {
		console.log(authorization)
		if (!authorization & !isPublic(route.pathname)) {
			route.push('/login')
		}
	}, [route])
	

	return (
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
				<Navbar auth={authorization} />
				<div id="content" className="main-content">
					{props.children}
				</div>
			</>
		</div>
	);
};

export default MainLayout;
