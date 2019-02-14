module.exports = {
    successResponse : (message, token = null, data = null) => token === null ? (data === null ? ({
        success : true,
        message : message
    }) : ({
        success : true,
        message : message,
        data : data
    })) : ({
        success : true,
        message : message,
        token : token
    }),
    failureResponse : message => ({
        success : false,
        message : message
    })
}
