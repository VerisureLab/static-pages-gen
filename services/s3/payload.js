const S3 = require('../clients/aws').s3;

module.exports.put = (id, data) =>
    S3.putObject({
        Bucket: process.env.BUCKET_PAGE_GEN_NAME,
        Key: `${id}/payload.json`,
        Body: JSON.stringify(data)
    }).promise()

module.exports.get = (key) => new Promise((resolve, reject) => {
    S3.getObject({
        Bucket: process.env.BUCKET_PAGE_GEN_NAME,
        Key: key
    }, (err, data) => {
        if (err) reject(err)
        else resolve(JSON.parse(data.Body));
    })
})
