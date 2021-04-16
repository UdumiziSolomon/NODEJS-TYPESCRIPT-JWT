import { Document } from 'mongoose';
// user interface
interface IUser extends Document {
    email: string ;
    username: string ;
    password: string ;
};

export default IUser;