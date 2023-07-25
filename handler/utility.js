const payload = require('../services/s3/payload');
const { v4: uuidv4 } = require('uuid');
const file = require('../data/tmp/payload_bsc.json');

/**
 * Fake putPayload
 * @param event
 * @returns {Promise<unknown>}
 */
module.exports.putPayload = async event => {
    const response = await payload.put(uuidv4(), file);
    return response;
}

module.exports.putJson = async json => {
    const response = await payload.put(uuidv4(), json);
    return response;
}

const allowedKeys = {
    channel: ['id', 'name', 'slug_name'],
    source: ['id', 'name', 'slugName', 'origin', 'contactPhone', 'contactPhoneMobile', 'theme'],
    creativity: ['id', 'name', 'slugName', 'mainText', 'mainTextMobile']
};

module.exports.reducedPayload = payload => {
    return Object.keys(allowedKeys)
        .map(key => {
            return allowedKeys[key]
                .reduce((accumulator, current) => {
                    if (!accumulator[key]) {
                        accumulator[key] = {};
                    }

                    if (payload[key].hasOwnProperty(current)) {
                        accumulator[key][current] = payload[key][current];
                    }
                    return accumulator;
                }, {});
        })
        .reduce((obj, item) => ({
            ...obj,
            ...item
        }), {})
}



module.exports.flatten = data => {
    let result = {};

    let recurse = (cur, prop) => {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop ? prop + "." + i :"" + i);
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p :p);
            }
            if (isEmpty)
                result[prop] = {};
        }
    }

    recurse(data, "");
    return result;
}
