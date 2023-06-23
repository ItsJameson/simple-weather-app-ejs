import { MongoClient, ObjectId } from 'mongodb';
require('dotenv').config({path:'./specs.env'});

const uri = process.env.SECRET_KEY as string;
const client = new MongoClient(uri);

const databankGetData = async () => {

    try {
        await client.connect();
        
        
        const data = await client.db('DATABANK NAME').collection('COLLECTION').find({});
        let result = await data.toArray();

        return result;
    }
    catch (error: any) {
        console.log(error.message);
    }
    finally {
        await client.close();
    }
}