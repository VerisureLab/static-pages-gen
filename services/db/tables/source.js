const database = require('../Database');
const { v4: uuidv4 } = require('uuid');

const tableName = 'Pages_Source';

module.exports.save = async (id, data) => database.putItem(tableName, { id: id || uuidv4(), ...data });