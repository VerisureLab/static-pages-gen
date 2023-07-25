const ejs = require('ejs');
const theme = require('../s3/theme');
const dayjs = require('dayjs');
const code = require('./compress');
const { reducedPayload } = require("../../handler/utility");
const i18n = require('../translations/i18n');
const purgeCSS = require('./purge');

require('dayjs/locale/it');
dayjs.locale('it');

module.exports.render = payload => {
    const template = `templates/themes/${payload.source.theme}/index.ejs`;
    const serializedPayload = reducedPayload(payload);

    ejs.renderFile(template, { payload, dayjs, serializedPayload, i18n }, { cache: true }, async (err, html) => {
        err && console.error(err);
        await theme.put(payload, process.env.STAGE !== 'dev' ? code.compress(html) : html);
        // await purgeCSS.purge(payload, html);
    });
}