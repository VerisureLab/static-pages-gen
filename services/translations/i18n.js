const i18n = require('i18next');
const translationIT = require('./it.json');

i18n.init({
    resources : {
        it: {
            translation: translationIT
        }
    },
    lng: "it",
    interpolation: {
        escapeValue: false
    }
});


module.exports = i18n