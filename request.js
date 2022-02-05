const request = require('request');
 
_EXTERNAL_URL = 'https://api.publicapis.org/categories';
_EXTERNAL_URL_BY_CATEGORY = 'https://api.publicapis.org/categories';

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingRequest;