import express from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
},{ timestamps: true } );

const User = mongoose.model<IUser>('User', userSchema);

export default User ;
