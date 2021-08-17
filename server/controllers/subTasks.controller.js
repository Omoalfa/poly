const httpStatus = require('http-status');
const subTaskServices = require('../services/subTasks.service');
const ActivityService = require('../services/activities.service');
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getSubTaskByTaskId = catchAsync(async (req, res) => {
    try {
        const data = await subTaskServices.getSubTaskByTaskId(req.params.Id);
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
 * @input : Form( Object ) : req.body
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const createSubTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const createTask = {
            taskName: req.body.name,
            description: req.body.description,
            taskId: req.body.taskId,
            userId: usertoken.userId
        }

        const taskData = await subTaskServices.createSubTask(createTask);

        if (taskData) {
            const activityData = {
                activity_name: 'created the task',
                sub_activity: req.body.name,
                task_id: req.body.taskId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.CREATED).send({
                "status": "success",
                "message": "Sub Task created successfully!!"
            });
        }
        else {
            res.status(httpStatus.BAD_REQUEST).send({
                "error": {
                    "status": "failure",
                    "message": `error occurred while creating data or data not found`
                }
            });
        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            "error": {
                "status": "failure",
                "message": `error occurred while creating data or data not found`
            }
        });
    }
});

/**
 * @param  {String} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const updateSubTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = parseInt(req.params.Id)

        const tasks = req.body;

        const filter = { where: { task_id: Id } };
        const result = await subTaskServices.updateSubTask(tasks, filter);

        if (result.length > 0) {
            const activityData = {
                activity_name: `${req.body.status} the task `,
                sub_activity: req.body.name,
                task_id: req.body.taskId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Sub Task updated successfully!!'
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
}
);

module.exports = {
    getSubTaskByTaskId,
    createSubTask,
    updateSubTask
}