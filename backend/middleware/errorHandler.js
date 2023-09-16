import { AppError } from "./appErr.js";

const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong"
    res.status(status).send(message);
};

export { errorHandler };