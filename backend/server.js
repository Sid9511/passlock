const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const url = process.env.MONGO_URI;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5174/passlock',
    'http://localhost:5174/passlock/pass',
    'https://sid9511.github.io',
    'https://passlock-frontend.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Apply bodyParser middleware globally
app.use(bodyParser.json());

let client;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connectedClient) => {
        client = connectedClient;
        console.log('Connected successfully to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.get('/', async (req, res) => {
    try {
        const db = client.db('passlock');
        const collection = db.collection('Passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).send({ error: 'Failed to fetch passwords' });
    }
});

app.post('/', async (req, res) => {
    try {
        const password = req.body;
        const db = client.db('passlock');
        const collection = db.collection('Passwords');
        const insertResult = await collection.insertOne(password);
        res.status(201).send({ success: true, result: insertResult });
    } catch (error) {
        console.error('Error saving password:', error);
        res.status(500).send({ error: 'Failed to save password' });
    }
});

app.delete('/passwords/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ success: false, message: 'ID is required' });
    }
    try {
        console.log('Deleting password with ID:', id);
        const db = client.db('passlock');
        const collection = db.collection('Passwords');
        const deleteResult = await collection.deleteOne({ id: id });

        if (deleteResult.deletedCount) {
            return res.send({ success: true, result: deleteResult });
        }
        res.status(404).send({ success: false, message: 'Password not found' });
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).send({ error: 'Failed to delete password' });
    }
});

app.put('/passwords/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPassword = req.body;
        const db = client.db('passlock');
        const collection = db.collection('Passwords');
        const updateResult = await collection.updateOne(
            { id: id },
            { $set: updatedPassword }
        );

        if (updateResult.matchedCount > 0) {
            res.send({ success: true, result: updateResult });
        } else {
            res.status(404).send({ success: false, message: 'Password not found' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send({ error: 'Failed to update password' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
