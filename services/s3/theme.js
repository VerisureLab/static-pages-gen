const S3 = require('../clients/aws').s3;

module.exports.put = (payload, html) => new Promise((resolve, reject) => {
    const key = `allarme/${payload.source.slugName}/${payload.creativity.slugName}/${payload.creativity.slug}.html`;

    S3.putObject({
        Bucket: process.env.BUCKET_LANDING_GEN_NAME,
        Key: key,
        Metadata: {
            'payload-id': payload.id,
            'source-slugname': payload.source.slugName,
            'creativity-slugname': payload.creativity.slugName,
            'creativity-slug': payload.creativity.slug
        },
        'ContentType': 'text/html',
        Body: html,
    }, (err, data) => {
        if (err) reject(err)
        else resolve(html);
    })
})

module.exports.get = (key) => new Promise((resolve, reject) => {
    S3.getObject({
        Bucket: process.env.BUCKET_LANDING_GEN_NAME,
        Key: key
    }, (err, data) => {
        if (err) reject(err)
        else resolve(data.Body);
    })
})