const schedule = require('node-schedule');
const moment = require('moment');
const fileController = require('./controllers/files.controller');

schedule.scheduleJob("0 * * * *", function () {
    console.log(`Delete file run at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    fileController.deleteFiles().then(() => {
        console.log("Äll Files Deleted")
    }).catch((error) => {
        console.log("Ran into error while removing files.", JSON.stringify(error))
    });
});