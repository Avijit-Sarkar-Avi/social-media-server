const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bkopbwy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userInfoCollection = client.db('socialApp').collection('userinfo');
        const statusCollection = client.db('socialApp').collection('mystatus');
        const commentsCollection = client.db('socialApp').collection('mycomments');

        app.get('/userinfo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const userInfo = await userInfoCollection.findOne(query);
            res.send(userInfo);
        });

        app.post('/userinfo', async (req, res) => {
            const userInfo = req.body;
            const result = await userInfoCollection.insertOne(userInfo);
            res.send(result);
        });

        app.post('/mystatus', async (req, res) => {
            const mystatus = req.body;
            const result = await statusCollection.insertOne(mystatus);
            res.send(result);
        });

        app.get('/mystatus', async (req, res) => {
            const query = {};
            const result = await statusCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/mycomments', async (req, res) => {
            const mycomments = req.body;
            const result = await commentsCollection.insertOne(mycomments);
            res.send(result);
        });

    }
    finally {

    }
}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('Social App is running')
})

app.listen(port, () => {
    console.log(`Social App running on ${port}`)
})
