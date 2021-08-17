const errorJson = (code, message) => {
    return {
        "error": {
            "code": code,
            "message": message
        }
    }
}

module.exports = {
    errorJson
};
