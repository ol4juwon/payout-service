global.createSuccessResponse = (res, data, code = 200, isPaginated = false) => {
    if (isPaginated || (data && data.docs)) {
        data.data = data.docs;
        delete data.docs;
        res.response = {data};
        return res.status(code).json(data);
    }

    res.success = {data};
    return res.status(code).json({data});
};

global.createErrorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
    res.error = {error};
    return res.status(code).json({error});
};

global.handleAxiosError = error => {
    try {
        if (error && error.response) {
            return {
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data.error,
                url: error.response.config.url,
                params: error.response.config.params,
                data: error.response.config.data,
                headers: error.response.headers,
                error: error.response.data,
                errorInString: JSON.stringify(error.response.data || {}),
                innerErrorText: error.response.data.error,
                innerError: JSON.stringify(error.response.data)
            }
        }
        return {
            status: 500,
            statusText: error.message || "Unknown Error",
            message: error.message || "Oops, An Error Occurred",
            stack: error.stack
        }
    } catch (ex) {
        return {
            status: 500,
            statusText: "Unknown Error",
            message: "Oops, An Error Occurred",
            error: ex.message,
            stack: ex.stack
        }
    }

};


global.getTimestamp = () => {
    let d = new Date();
    d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return d.getTime();
};
