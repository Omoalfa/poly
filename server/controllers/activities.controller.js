const httpStatus = require('http-status');
const activitiesServices = require('../services/activities.service');
const catchAsync = require('../utils/catchAsync');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getActivites = catchAsync(async (req, res) => {
    try {
        const data = await activitiesServices.getActivites();
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
const getActivityByProjectId = catchAsync(async (req, res) => {
    try {
        const Id = req.params.Id
        const data = await activitiesServices.getActivityByProjectId(Id);
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
 const getActivityByTaskId = catchAsync(async (req, res) => {
    try {
        const Id = req.params.Id
        const data = await activitiesServices.getActivityByTaskId(Id);
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


module.exports = {
    getActivites,
    getActivityByProjectId,
    getActivityByTaskId
}