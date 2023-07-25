const payload = require('../services/s3/payload');
const { render } = require('../services/build/render');

module.exports.parsePayload = async event => {
    const promises = event.Records
        .map(async record => {
            const data = await payload.get(record.s3.object.key);
            return data;
        });

    Promise.all(promises)
        .then((results) => {
            results.map(async result => {
                const html = await render(result);
                console.log(html)
            })
        })
        .catch((e) => {
            console.error('error:', e.message);
        });
}
