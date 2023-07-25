import AWS from "aws-sdk";

class Database {
    constructor() {
        let params = {};

        if (process.env.STAGE === 'dev') {
            const dynamoDB = new AWS.DynamoDB({ endpoint: new AWS.Endpoint(process.env.DB_ENDPOINT) });
            params = { service: dynamoDB };
        }

        this._connection = new AWS.DynamoDB.DocumentClient(params);
    }

    async putItem(table, data) {
        return new Promise((resolve, reject) => {
            this._connection.put({
                TableName: table,
                Item: data
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async getItem(table, id, identifierFieldName = 'id') {
        return new Promise((resolve, reject) => {
            this._connection.get({
                TableName: table,
                Key: { [identifierFieldName]: id }
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async updateItem(table, id, data, identifierFieldName = 'id') {
        return new Promise((resolve, reject) => {
            this._connection.update({
                TableName: table,
                Key: { [identifierFieldName]: id },
                UpdateExpression: `set ${Object.keys(data).reduce((fields, field) => fields.concat(`${field} = :${field}`), []).join(', ')}`,
                ExpressionAttributeValues: Object.keys(data).reduce((expr, field) => {
                    expr[`:${field}`] = data[field];
                    return expr;
                }, {})
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }

    async deleteItem(table, id, identifierFieldName = 'id') {
        return new Promise((resolve, reject) => {
            this._connection.delete({
                TableName: table,
                Key: { [identifierFieldName]: id }
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async scan(table, nextToken) {
        return new Promise((resolve, reject) => {
            this._connection.scan({
                TableName: table,
                ExclusiveStartKey: nextToken || null
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        items: data.Items,
                        nextToken: data.LastEvaluatedKey ? data.LastEvaluatedKey : null
                    });
                }
            });
        });
    }
}

const singletonInstance = new Database();

module.exports = Object.freeze(singletonInstance);
