const successResponse = (message, token = null, data = null) =>
    token === null
        ? (
            data === null
                ? ({
                    success: true,
                    message: message
                })
                : ({
                    success: true,
                    message: message,
                    data: data
                })
        )
        : ({
            success: true,
            message: message,
            token: token
        })


const failureResponse = message => ({
    success: false,
    message: message
})


module.exports = {
    successResponse,
    failureResponse,
    serverError: () => failureResponse('Internal Server Error')
}
