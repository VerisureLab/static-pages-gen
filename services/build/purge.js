const purge = require('purgecss').PurgeCSS;

module.exports.purge = async (payload, html) => {
    const css = `../../dist/css/${payload.source.theme}.css`;

    console.log(html)

    await new purge.PurgeCSS({
        content: [
            {
                raw: html,
                extension: 'html'
            },
        ],
        css: [css]
    }).purge()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    ;
}