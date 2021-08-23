const httpStatus = require('http-status');
const mailsService = require('../services/mails.service');
const catchAsync = require('../utils/catchAsync');
const nodemailer = require("nodemailer");
const config = require('../config/config');

let mailService

const mail = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: true,
    auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass,
    },
});

const initMailService = () => {
    try {
        mailService = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: true,
            auth: {
                user: config.email.auth.user,
                pass: config.email.auth.pass,
            },
        });
        console.log("Mail service initialised")
    } catch (error) {
        console.log(error)
    }
}


const generateAutomatedEmailTemplate = () => {
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     </head>
     <body style="font-size: 14px">
            <section style="align-items: center;">
                <div class="container">
                    <p> Hello! </p>  
                        <p>
                            You’ve been invited to join us in using the Alpha version of Poly186. With an account, you can collaborate with us to build out our platform and its business. To set up your account, simply click on this link to get started with our
                            <a href="https://knowledge-base.poly186.io/sign-up">Knowledge-Base </a>
                        </p> 
                    <p>
                        Use our project management system to see what we are working on and be part of it. This marks the beginning of our long and beautiful journey together towards the utopian future we can create together. 
                    </p> 
                    <p>
                        Best,
                    </p>
                    <p>
                        The Poly186 team
                    <p/>      
                </div>
            </section>
    </body>
    </html>`;
    return html;
};

/**
 * @input : Form( Object ) : req.body
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const sendUserInvitationEmail = catchAsync(async (req, res) => {
    try {
        const email = req.body.email;
        const userCount = await mailsService.checkEmailDuplication(email);
        if (userCount[0].count == 0) {
            const htmlContent = generateAutomatedEmailTemplate();
            const response = await mailService.sendMail({
                from: `"Poly186 Bot"${config.email.from}` ,
                to: email,
                subject: "Signup Invitation",
                html: htmlContent
            });
            if (response.accepted) {
                res.status(httpStatus.CREATED).send({
                    "status": "success",
                    "message": "Mail sent successfully!!"
                });
            } else {
                res.status(httpStatus.BAD_REQUEST).send({
                    "error": {
                        "status": "failure",
                        "message": `error occurred while sending email`
                    }
                });
            }
        } else {
            res.status(httpStatus.BAD_REQUEST).send({
                "error": {
                    "status": "failure",
                    "message": `Email is Already Exist`
                }
            });
        }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            "error": {
                "status": "failure",
                "message": `Internal Server Error`
            }
        });
    }
});

module.exports = {
    initMailService,
    sendUserInvitationEmail,
    mail
}