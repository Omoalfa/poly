import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { setCookie } from 'nookies';

class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx)
    //     if (ctx.query.token) {
    //         setCookie(ctx, 'authorization', ctx.query.token, {
    //             maxAge: 30 * 24 * 60 * 60,
    //             path: '/',
    //         });
    //     }

    //     return { ...initialProps }
    // }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script type="text/javascript" src="assets/js/jquery.min.js"></script>
                    <script type="text/javascript" src="assets/js/popper.min.js"></script>
                    <script type="text/javascript" src="assets/js/bootstrap.js"></script>
                    <script type="text/javascript" src="assets/js/autosize.min.js"></script>
                    <script type="text/javascript" src="assets/js/flatpickr.min.js"></script>
                    <script type="text/javascript" src="assets/js/prism.js"></script>
                    <script type="text/javascript" src="assets/js/draggable.bundle.legacy.js"></script>
                    <script type="text/javascript" src="assets/js/swap-animation.js"></script>
                    <script type="text/javascript" src="assets/js/dropzone.min.js"></script>
                    <script type="text/javascript" src="assets/js/list.min.js"></script>
                    <script type="text/javascript" src="assets/js/theme.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument