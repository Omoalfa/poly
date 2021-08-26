import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div style={{ color: "rgb(0, 0, 0)", background: "rgb(255, 255, 255)", height: "100vh", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <h1 style={{ display: "inline-block", color: "blue", margin: "0px 20px 0px 0px", fontSize: "60px", fontWeight: "500", verticalAlign: "top" }}>4<img src="assets/img/emoji.png" style={{ width: "50px", height: "50px", marginBottom: "12px" }}></img>1</h1>
                </div>
                <h2 style={{ fontSize: "14px", fontWeight: "normal", lineHeight: "inherit", margin: "0px", padding: "0px" }}>
                    You are not authorized to access this area. Click <a href="https://knowledge-base.poly186.io/sign-in/"> here </a>  to sign in <br />
                     - OR -<br />
                    Click<a href="https://platform.poly186.io/"> here </a>to  go home<br />
                    - OR -<br />
                    <a href="https://knowledge-base.poly186.io/contact-us/"> Contact Us </a> if you think this might be an error
                </h2>


                {/* <h2 style={{ fontSize: "14px", fontWeight: "normal", lineHeight: "inherit", margin: "0px", padding: "0px" }}>
                    The page you were looking for was not found.
                        <a href="http://localhost/testsite/wordpress/wp-admin/"> Click here to </a>
                </h2>
                <h2 style={{ fontSize: "14px", fontWeight: "normal", lineHeight: "inherit", margin: "0px", padding: "0px" }}>
                    <a href="http://localhost/testsite/wordpress/wp-admin/"> go home </a>
                        or
                    <a href="http://localhost/testsite/wordpress/wp-admin/"> Contact Us </a>
                       if you think this might be an error
                </h2> */}
            </div>
        )
    }
}

export default Login;