const { Client } = require ('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/luxe_bags');



module.exports = client;