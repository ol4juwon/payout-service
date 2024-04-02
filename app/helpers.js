"use strict"
const crypto = require('crypto');


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

const binaryToAscii = (binaryString) => {
    const chunks = binaryString.match(/.{1,8}/g);

    const asciiChars = chunks.map(chunk => String.fromCharCode(parseInt(chunk, 2)));

    return asciiChars.join('');
}

const encryptData = async  (data, key, iv) => {
    // console.log({data})
    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    // console.log("Encryped data ", encrypted);
    return encrypted;
}

global.decryptData = async  (data, key, iv) => {
    try {
        const decipher = crypto.createDecipheriv('des-ede3-cbc', key, iv);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
    }
}

global.binaryToAscii = binaryToAscii
global.encryptData = encryptData

module.exports = {binaryToAscii, encryptData}