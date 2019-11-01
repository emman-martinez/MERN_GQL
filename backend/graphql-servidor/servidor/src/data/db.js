import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PENV_MONGO_URI = process.env.MONGODB_URI;

const URI = PENV_MONGO_URI ?
    PENV_MONGO_URI :
    'mongodb://localhost/databasetest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is Connected on: '.cyan, PENV_MONGO_URI.blue)
});