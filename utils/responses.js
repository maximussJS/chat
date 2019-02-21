const success = (message, token = null, data = null) =>
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


const failure = message => ({
    success: false,
    message: message
})


module.exports = {
    success,
    failure,
    serverError: () => failure('Internal Server Error')
}
