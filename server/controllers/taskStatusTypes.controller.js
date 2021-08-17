const httpStatus = require('http-status');
const taskStatusTypeServices = require('../services/taskStatusTypes.service');
const taskServices = require('../services/tasks.service');
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');


/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getTaskStatusType = catchAsync(async (req, res) => {
    try {
        const data = await taskStatusTypeServices.getTaskStatusType();
        res.status(httpStatus.OK).send({
            "status": "success",
            "data": data
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while updating data or data not found`
            }
        });
    }
});

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getTaskStatusTypeById = catchAsync(async (req, res) => {
    const Id = req.params.Id;
    try {
        const data = await taskStatusTypeServices.getTaskStatusTypeById(Id);
        res.status(httpStatus.OK).send({
            "status": "success",
            "data": data
        });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while updating data or data not found`
            }
        });
    }
})


/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const updateTaskStatusType = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const data = {
            name: req.body.name,
            status: req.body.name,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };

        const filter = { where: { id: req.params.Id } };
        const result = await taskStatusTypeServices.updateTaskStatusType(data, filter);

        if (result.length > 0) {
            const Data = {
                previousName: req.body.previousName,
                status: req.body.name
            }

            await taskServices.updateTaskByStatus(Data);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'update successfully'
            });
        } else {
            res.status(httpStatus.BAD_REQUEST).send({
                "error": {
                    "status": "failure",
                    "message": `error occurred while updating data or data not found`
                }
            });
        }
    }
    catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while updating data or data not found`
            }
        });
    }
})

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const createTaskStatusType = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const data = {
            name: req.body.name,
            status: req.body.name,
            created_by: usertoken.userId,
            created_at: Date.now()
        };

        await taskStatusTypeServices.createTaskStatusType(data);

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'update successfully'
        });

    }
    catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while updating data or data not found`
            }
        });
    }
})

module.exports = {
    getTaskStatusType,
    getTaskStatusTypeById,
    updateTaskStatusType,
    createTaskStatusType
}