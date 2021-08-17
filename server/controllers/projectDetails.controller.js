const httpStatus = require('http-status');
const projectDetailsService = require('../services/projectDetails.service');
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');

/**
 * @param {Object} filter
 * @return Success : data
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
const getHomePageDetails = catchAsync(async (req, res) => {
    try {
        const data = await projectDetailsService.getHomePageDetails();
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
 const getHomePageDetail = catchAsync(async (req, res) => {
    try {
        const data = await projectDetailsService.getHomePageDetail(req.params.Id);
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
 * @param  {String} req.params.Id
 * @return Success : { result: [1] }
 * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
 */
 const updateDetail = catchAsync(async (req, res) => {
    try {
        const usertoken = await tokenService.verifyAccessToken(req.cookies.authorization);
        const Id = req.params.Id
        const data = {
            title: req.body.title,
            description: req.body.description,
            updated_by: usertoken.userId,
            updated_at: Date.now()
        };

        const filter = { where: { id: Id } };

        const result = await projectDetailsService.updateDetail(data, filter);

        if (result.length > 0) {
            res.status(httpStatus.OK).send({
                "status": "success",
                "message": 'updated successfully!!'
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

module.exports = {
    getHomePageDetails,
    getHomePageDetail,
    updateDetail
}