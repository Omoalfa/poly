const httpStatus = require('http-status');
const taskNotesServices = require('../services/taskNotes.service');
const ActivityService = require('../services/activities.service');
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getTaskNoteById = catchAsync(async (req, res) => {
    try {
        const data = await taskNotesServices.getTaskNoteById(req.params.Id);
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
const getTaskNoteByNoteId = catchAsync(async (req, res) => {
    try {
        const data = await taskNotesServices.getTaskNoteByNoteId(req.params.Id);
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
const createTaskNote = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const createTask = {
            name: req.body.name,
            description: decodeURIComponent(req.body.description),
            taskId: req.body.taskId,
            userId: usertoken.userId
        }

        const taskData = await taskNotesServices.createTaskNote(createTask);

        if (taskData) {
            const activityData = {
                activity_name: 'created the note',
                sub_activity: req.body.name,
                task_id: req.body.taskId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.CREATED).send({
                "status": "success",
                "message": "Note added successfully!!"
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
const updateTaskNote = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const taskData = {
            name: req.body.name,
            description: decodeURIComponent(req.body.description),
            task_id: req.body.taskId,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };

        const filter = { where: { id: Id } };

        const result = await taskNotesServices.updateTaskNote(taskData, filter);

        if (result.length > 0) {
            const activityData = {
                activity_name: 'updated the note',
                sub_activity: req.body.name,
                task_id: req.body.taskId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Note updated successfully!!'
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
}
);

/**
 * @param  {Number} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const deleteTaskNote = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id;
        const task = await taskNotesServices.getTaskNoteByNoteId(Id);
        const activityData = {
            activity_name: 'removed the note',
            sub_activity: task[0].name,
            task_id: task[0].task_id,
            created_by: usertoken.userId,
            created_at: Date.now()
        }

        await taskNotesServices.deleteTaskNote(Id);
        
        await ActivityService.createActivity(activityData);

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'note deleted successfully!!'
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

module.exports = {
    getTaskNoteById,
    createTaskNote,
    updateTaskNote,
    deleteTaskNote,
    getTaskNoteByNoteId
}