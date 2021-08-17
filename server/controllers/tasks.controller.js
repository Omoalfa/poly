const httpStatus = require('http-status');
const taskServices = require('../services/tasks.service');
const subTasksServices = require('../services/subTasks.service');
const tokenService = require('../services/token.service');
const taskMemberServices = require('../services/taskMembers.service');
const ActivityService = require('../services/activities.service');
const catchAsync = require('../utils/catchAsync');


/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getTaskTypes = catchAsync(async (req, res) => {
    try {
        const data = await taskServices.getTaskTypes();
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
const getTaskByProjectId = catchAsync(async (req, res) => {
    try {
        const data = await taskServices.getTaskByProjectId(req.params.Id);
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const array = await taskMemberServices.getMemberByTask(data[i].id);
                if (array.length > 0) {
                    for (let j = 0; j < array.length; j++) {
                        data[i]["memberData"] = array
                    }
                } else {
                    data[i]["memberData"] = [];
                }
            }
        }
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
const getTaskById = catchAsync(async (req, res) => {
    try {
        const data = await taskServices.getTaskById(req.params.Id);
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
const createTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const createTask = {
            taskName: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            projectId: req.body.projectId,
            status: req.body.status,
            taskTypeId: req.body.taskTypeId,
            userId: usertoken.userId
        }
        const taskData = await taskServices.createTask(createTask);

        if (taskData) {
            const taskId = taskData.id;
            const members = [];
            const data = req.body.member;

            data.map(member => {
                members.push({ task_id: taskId, member_id: member, created_by: usertoken.userId, created_at: Date.now() })
            });

            await taskMemberServices.createTaskMember(members);

            const activityData = {
                activity_name: 'created the task',
                sub_activity: req.body.name,
                project_id: req.body.projectId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.CREATED).send({
                "status": "success",
                "message": "Task created successfully!!"
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
const updateTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const taskData = {
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.startDate,
            end_date: req.body.end_date,
            project_id: req.body.projectId,
            status: req.body.status,
            task_type_id: req.body.taskTypeId,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };
        const data = req.body.member;
        const filter = { where: { id: Id } };
        const members = [];
        data.map(member => {
            members.push({ task_id: Id, member_id: member, created_by: usertoken.userId, created_at: Date.now() })
        });
        const memberData = await taskMemberServices.getMemberByTaskId(Id)
        if (memberData.length > 0) {
            await taskMemberServices.deleteMember(Id);
        }
        await taskMemberServices.createTaskMember(members);
        const result = await taskServices.updateTask(taskData, filter);
        if (result.length > 0) {
            const activityData = {
                activity_name: 'rescheduled the task',
                sub_activity: req.body.name,
                project_id: req.body.projectId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Task updated successfully!!'
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
 * @param  {String} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const updateTaskStatus = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const taskData = {
            status: req.body.status,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };
        const filter = { where: { id: Id } };
        const task = await taskServices.getTaskById(Id);
        const result = await taskServices.updateTaskStatus(taskData, filter);

        if (req.body.status === 'Done') {
            const subTasks = await subTasksServices.getSubTaskByTaskId(Id)
            console.log(subTasks)
            subTasks.map(subTask => {
                subTask.status = 'Done'
                subTasksServices.updateSubTask([subTask], {})
            })
        }
        if (result.length > 0) {
            const activityData = {
                activity_name: `${req.body.status} the task`,
                sub_activity: task[0].name,
                project_id: task[0].project_id,
                task_id: task[0].id,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);
            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Task status change successfully'
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
 * @param  {String} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const completeTaskStatus = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const taskData = {
            status: req.body.status,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };
        const filter = { where: { id: Id } };
        const task = await taskServices.getTaskById(Id);
        const result = await taskServices.updateTaskStatus(taskData, filter);
        if (result.length > 0) {
            const activityData = {
                activity_name: `${req.body.status} the task`,
                sub_activity: task[0].name,
                project_id: task[0].project_id,
                task_id: task[0].id,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);
            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Task status change successfully'
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
 * @param  {String} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const archiveTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const taskData = {
            name: req.body.name,
            status: req.body.status,
            update_by: usertoken.userId,
            updated_at: Date.now()
        };

        const filter = { where: { id: Id } };
        const taskType = await taskServices.getTaskTypesById(Id);
        await taskServices.archiveTask(taskData, filter);
        if (req.body.status != null) {
            const Data = {
                id: taskType.id,
                status: req.body.status
            }
            await taskServices.archiveTaskStatus(Data);
        }

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'Task archive successfully!!'
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
}
);

/**
 * @param  {Number} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const deleteTask = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id;
        const task = await taskServices.getTaskById(Id);
        const activityData = {
            activity_name: 'removed the task',
            sub_activity: task[0].name,
            project_id: task[0].project_id,
            created_by: usertoken.userId,
            created_at: Date.now()
        }

        const memberData = await taskMemberServices.getMemberByTaskId(Id);

        if (memberData.length > 0) {
            await taskMemberServices.deleteMember(Id);
            await taskServices.deleteTask(Id);
            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'task deleted successfully!!'
            });
        } else {
            await taskServices.deleteTask(Id);
            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'task deleted successfully!!'
            });
        }
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
    getTaskById,
    getTaskByProjectId,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getTaskTypes,
    archiveTask,
    completeTaskStatus
}