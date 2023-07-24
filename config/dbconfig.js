const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://bitz:JLP840wGgnVPpbEV@cluster101.zsgcwml.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ISSUETRACKERBITZ';
const collectionName = 'ISSUETRACKER_2023';

async function getProjectDATA() {
    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        //console.log('Connected to the database successfully.');
        return collection;
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to the database.');
    }
}

module.exports = getProjectDATA;
