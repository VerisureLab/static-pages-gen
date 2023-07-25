const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

module.exports.dynamodb = new AWS.DynamoDB(process.env.STAGE === 'dev'
    ? { endpoint: new AWS.Endpoint(process.env.DB_ENDPOINT) }
    : {}
);

module.exports.dynamodbDocumentClient = new AWS.DynamoDB.DocumentClient(process.env.STAGE === 'dev'
    ? { service: module.exports.dynamodb }
    : {}
);

module.exports.cloudfront = new AWS.CloudFront();

module.exports.s3 = new AWS.S3(process.env.STAGE === 'dev'
    ? {
        s3ForcePathStyle: true,
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
        endpoint: new AWS.Endpoint(process.env.S3_ENDPOINT),
    }
    : {}
);

module.exports.sqs = new AWS.SQS(process.env.STAGE === 'dev'
    ? { endpoint: new AWS.Endpoint(process.env.SQS_ENDPOINT) }
    : {}
);