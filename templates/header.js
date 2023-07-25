const themes = require('./themes');

module.exports.header = payload => new Promise((resolve, reject) => {
    if (!themes.hasOwnProperty(payload.source.theme)) {
        return reject('Theme not found');
    }

    resolve(themes[payload.source.theme].header(payload));
})