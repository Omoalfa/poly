const httpStatus = require('http-status');
const tokenService = require('../services/token.service');
const projectsService = require('../services/projects.service');
const projectMembersService = require('../services/projectMembers.service');
const ActivityService = require('../services/activities.service');
const TeamsService = require('../services/teams.service');
const catchAsync = require('../utils/catchAsync');



/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getProjects = catchAsync(async (req, res) => {
    try {
        const data = await projectsService.getProjects();
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const array = await projectMembersService.getMemberByProject(data[i].id);
                if (array.length > 0) {
                    for (let j = 0; j < array.length; j++) {
                        data[i]["memberData"] = array;
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
const getProjectsByTeamId = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        if (usertoken.isAdmin) {
            const data = await projectsService.getProjects(req.params.Id);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const array = await projectMembersService.getMemberByProject(data[i].id);
                    if (array.length > 0) {
                        for (let j = 0; j < array.length; j++) {
                            data[i]["memberData"] = array;
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
        } else {
            const data = await projectsService.getProjectsByTeamId(req.params.Id, usertoken.userId);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const array = await projectMembersService.getMemberByProject(data[i].id);
                    if (array.length > 0) {
                        for (let j = 0; j < array.length; j++) {
                            data[i]["memberData"] = array;
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
const getProjectById = catchAsync(async (req, res) => {
    try {
        const data = await projectsService.getProjectById(req.params.Id);
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
const createProject = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const createProject = {
            projectName: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            visibility: req.body.visibility,
            userId: usertoken.userId
        }

        const projectData = await projectsService.createProject(createProject);

        if (projectData) {
            const teamProject = {
                projectId: projectData.id,
                teamId: req.body.teamId,
                userId: usertoken.userId
            }

            await TeamsService.createProjectTeam(teamProject);

            const members = [];
            const projectId = projectData.id;
            const data = req.body.member;

            if (data.length > 0) {
                data.map(member => {
                    if (member != usertoken.userId) {
                        members.push({ member_id: member, project_id: projectId, created_by: usertoken.userId, created_at: Date.now() })
                    }
                });
                members.push({ member_id: usertoken.userId, project_id: projectId, created_by: usertoken.userId, created_at: Date.now() })
            }
            else {
                members.push({ member_id: usertoken.userId, project_id: projectId, created_by: usertoken.userId, created_at: Date.now() })
            }

            await projectMembersService.createProjcetMember(members);

            const activityData = {
                activity_name: 'created the project',
                sub_activity: req.body.name,
                project_id: projectId,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.CREATED).send({
                "status": "success",
                "message": "Project created successfully!!"
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
const updateProject = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const projectData = {
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            visibility: req.body.visibility,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };
        const data = req.body.member;
        const filter = { where: { id: Id } }
        const members = [];

        if (data.length > 0) {
            data.map(member => {
                if (member != usertoken.userId) {
                    members.push({ member_id: member, project_id: Id, created_by: usertoken.userId, created_at: Date.now() })
                }
            });
            members.push({ member_id: usertoken.userId, project_id: Id, created_by: usertoken.userId, created_at: Date.now() })
        }
        else {
            members.push({ member_id: usertoken.userId, project_id: Id, created_by: usertoken.userId, created_at: Date.now() })
        }

        const memberData = await projectMembersService.getMemberByProjectId(Id);

        if (memberData.length > 0) {
            await projectMembersService.deleteMember(Id);
        }

        await projectMembersService.createProjcetMember(members);

        const result = await projectsService.updateProject(projectData, filter)

        if (result.length > 0) {
            const activityData = {
                activity_name: 'rescheduled the project',
                sub_activity: req.body.name,
                project_id: Id,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Project updated successfully!!'
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
});

/**
 * @param  {Number} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const deleteProject = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id;
        const project = await projectsService.getProjectById(Id);
        const activityData = {
            activity_name: 'removed the project',
            sub_activity: project[0].name,
            created_by: usertoken.userId,
            created_at: Date.now()
        }

        await projectsService.deleteProject(Id);

        await ActivityService.createActivity(activityData);

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'Project deleted successfully!!'
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
    getProjects,
    getProjectById,
    getProjectsByTeamId,
    createProject,
    updateProject,
    deleteProject
}