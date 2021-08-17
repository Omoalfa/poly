const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fileServices = require('../services/files.service');
const ActivityService = require('../services/activities.service');
const tokenService = require('../services/token.service');
const config = require('../config/config');
const fs = require('fs-extra');
const findRemoveSync = require("find-remove")
const path = require("path")
var uploadsDir = path.join( __dirname , '../../public/uploads');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getFileById = catchAsync(async (req, res) => {
    try {
        const data = await fileServices.getFileById(req.params.Id);
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        if (data.length > 0) {
            fs.mkdir(path.join(uploadsDir, `/${usertoken.userId}`), { recursive: true }, (err) => {
                if (err) throw err;
                fs.writeFile(path.join(uploadsDir, `/${usertoken.userId}/${data[0].name}`), data[0].data, (err) => {
                    if (err) throw err;
                    res.download(path.join(uploadsDir, `/${usertoken.userId}/${data[0].name}`),data[0].name)
                });
            });
        } else {
            res.status(httpStatus.BAD_REQUEST).send({
                "error": {
                    "status": "failure",
                    "message": `error occurred while getting data or data not found`
                }
            });
        }

    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while getting data or data not found`
            }
        });
    }
});

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getFileDataByProjectId = catchAsync(async (req, res) => {
    try {
        const data = await fileServices.getFileDataByProjectId(req.params.Id);
        res.status(httpStatus.OK).send({
            "status": "success",
            "data": data
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while getting data or data not found`
            }
        });
    }
});

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getFileDataBytaskId = catchAsync(async (req, res) => {
    try {
        const data = await fileServices.getFileDataBytaskId(req.params.Id);
        res.status(httpStatus.OK).send({
            "status": "success",
            "data": data
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while getting data or data not found`
            }
        });
    }
});

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const uploadFileByProject = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        if (req.files) {
            const file = req.files.File;
            const data = {
                name: file.name,
                size: file.size,
                type: file.mimetype,
                data: file.data,
                projectId: req.params.Id,
                userId:usertoken.userId
            }
            await fileServices.uploadFileByProject(data);

            const activityData = {
                activity_name: 'upload the file',
                sub_activity: file.name,
                project_id: req.params.Id,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success"
            });
        }
        else {
            res.status(httpStatus.BAD_REQUEST).send({
                "status": "failure",
                "message": `error occurred while uploading data`
            });
        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while uploading data`
            }
        });
    }
});

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const uploadFileByTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        if (req.files) {
            const file = req.files.File;
            const data = {
                name: file.name,
                size: file.size,
                type: file.mimetype,
                data: file.data,
                taskId: req.params.Id,
                userId:usertoken.userId
            }

            await fileServices.uploadFileByProject(data);

            const activityData = {
                activity_name: 'upload the file',
                sub_activity: file.name,
                task_id: req.params.Id,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success"
            });
        }
        else {
            res.status(httpStatus.BAD_REQUEST).send({
                "status": "failure",
                "message": `error occurred while uploading data`
            });
        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while uploading data`
            }
        });
    }
});

/**
 * @param  {Number} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const deleteFile = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id;
        const file = await fileServices.getFileDataById(Id);

        const activityData = {
            activity_name: 'removed the file',
            sub_activity: file[0].name,
            created_by: usertoken.userId,
            created_at: Date.now()
        }

        await fileServices.deleteFile(Id);

        await ActivityService.createActivity(activityData);

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'File deleted successfully!!'
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while deleting data or data not found`
            }
        });
    }
});

const deleteFiles = () => {
    return new Promise((resolve, reject) => {
        try {
            const removedFiles = findRemoveSync( uploadsDir, { files: "*.*",age: {seconds: 1800},maxLevel:2})
            console.log(removedFiles)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getFileById,
    getFileDataByProjectId,
    getFileDataBytaskId,
    uploadFileByProject,
    uploadFileByTask,
    deleteFile,
    deleteFiles
}