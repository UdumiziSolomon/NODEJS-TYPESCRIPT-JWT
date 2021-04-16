import { debug } from 'console';
import mongoose from 'mongoose';

const dbConnect =  async () => { 
    const db_init = await mongoose.connect(`mongodb://localhost:27017/Typescript`,  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, keepAlive: true});
    try{
        db_init ? debug('Database connected') : debug('Database error');
    }
    catch(error){
        debug(error);
        process.exit(1);
    }
}
export default dbConnect ;