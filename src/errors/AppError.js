class AppError {
    message;
    statusCode;
    constructor(message = 'error', statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;