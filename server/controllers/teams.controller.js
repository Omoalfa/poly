const httpStatus = require('http-status');
const tokenService = require('../services/token.service');
const teamServices = require('../services/teams.service');
const teamMemberServices = require('../services/teamMembers.service');
const ActivityService = require('../services/activities.service');
const catchAsync = require('../utils/catchAsync');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getTeams = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        if (usertoken.isAdmin) {
            const data = await teamServices.getAllTeams();
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const array = await teamMemberServices.getMemberByTeam(data[i].id);
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
        } else {
            const data = await teamServices.getTeams(usertoken.userId);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const array = await teamMemberServices.getMemberByTeam(data[i].id);
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
const getTeamById = catchAsync(async (req, res) => {
    try {
        const data = await teamServices.getTeamById(req.params.Id);
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
const createTeam = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const createTeam = {
            teamName: req.body.name,
            description: req.body.description,
            userId: usertoken.userId
        }

        const teamData = await teamServices.createTeam(createTeam);
        if (teamData) {
            const members = [];
            const teamId = teamData.id;
            const data = req.body.member;

            if (data.length > 0) {
                data.map(member => {
                    if (member != usertoken.userId) {
                        members.push({ team_id: teamId, member_id: member, created_by: usertoken.userId, created_at: Date.now() })
                    }
                });
                members.push({ team_id: teamId, member_id: usertoken.userId, created_by: usertoken.userId, created_at: Date.now() })
            }
            else {
                members.push({ team_id: teamId, member_id: usertoken.userId, created_by: usertoken.userId, created_at: Date.now() })
            }

            await teamMemberServices.createTeamMember(members);
            const activityData = {
                activity_name: 'created the team',
                sub_activity: req.body.name,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.CREATED).send({
                "status": "success",
                "message": "Team created successfully!!"
            });
        } else {
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
const updateTeam = catchAsync(async (req, res) => {
    try {
        const Id = req.params.Id
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const teamData = {
            name: req.body.name,
            description: req.body.description,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };
        const members = [];
        const filter = { where: { id: Id } };
        const data = req.body.member;

        if (data.length > 0) {
            data.map(member => {
                if (member != usertoken.userId) {
                    members.push({ team_id: Id, member_id: member, created_by: usertoken.userId, created_at: Date.now() })
                }
            });
            members.push({ team_id: Id, member_id: usertoken.userId, created_by: usertoken.userId, created_at: Date.now() })
        }
        else {
            members.push({ team_id: Id, member_id: usertoken.userId, created_by: usertoken.userId, created_at: Date.now() })
        }

        const memberData = await teamMemberServices.getMemberByTeamId(Id)

        if (memberData.length > 0) {
            await teamMemberServices.deleteMember(Id);
        }

        await teamMemberServices.createTeamMember(members);

        const result = await teamServices.updateTeam(teamData, filter);

        if (result.length > 0) {
            const activityData = {
                activity_name: 'updated the team',
                sub_activity: req.body.name,
                created_by: usertoken.userId,
                created_at: Date.now()
            }

            await ActivityService.createActivity(activityData);

            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'Team updated successfully!!'
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
const deleteTeam = catchAsync(async (req, res) => {
    try {
        const Id = req.params.Id;
        const team = await teamServices.getTeamById(Id);
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const activityData = {
            activity_name: 'removed the team',
            sub_activity: team[0].name,
            created_by: usertoken.userId,
            created_at: Date.now()
        }

        await teamServices.deleteTeam(Id);

        await ActivityService.createActivity(activityData);

        res.status(httpStatus.OK).send({
            "status": "success",
            "message": 'team deleted successfully!!'
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
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
}