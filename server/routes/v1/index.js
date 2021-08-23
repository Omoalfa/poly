const express = require('express');
const httpStatus = require('http-status')
const authRoute = require('./auth.route');
const project = require('./projects.route');
const member = require('./members.route');
const task = require('./tasks.route');
const activity = require('./activities.route');
const teams = require('./teams.route');
const files = require('./files.route');
const subTask = require('./subTasks.route');
const taskNote = require('./taskNotes.route');
const mailRoute = require('./mail.route');
const taskStatusType = require('./taskStatusTypes.route');
const projectDetail = require('./projectDetails.route');
const router = express.Router();
const authService = require('../../services/auth.service');
const { route } = require('./projectDetails.route');


router.use((req, res, next) => {
    if (req.path.match(/auth/gi)) {
        next();
    } else {
        authService
            .validateAccess(req.cookies.authorization) // Authenitication Using Cookie
            .then(response => {
                authService.checkAccessToken(req.cookies.authorization, response.email).then(user => {
                    if (user) {
                        next();
                    } else {
                        return res
                            .clearCookie('authorization')
                            .status(httpStatus.UNAUTHORIZED)
                            .redirect('/login')
                    }
                })
            })
            .catch((error) => {
                console.log(error);
                res
                    .clearCookie('authorization')   
                    .status(httpStatus.UNAUTHORIZED)
                    .redirect('/login')
                    // .send({ error: { code: httpStatus.UNAUTHORIZED, message: 'Not Authorized' } })
            }
            );
    }
});

router.use('/project', project);
router.use('/member', member);
router.use('/task', task);
router.use('/activity', activity);
router.use('/team', teams);
router.use('/file', files);
router.use('/subTask', subTask);
router.use('/taskNote', taskNote);
router.use('/auth', authRoute);
router.use('/mail', mailRoute);
router.use('/taskStatusType', taskStatusType);
router.use('/projectDetail', projectDetail);
module.exports = router;
