  "use strict";
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { appRouter } from './routes/appRoute';
import dbConnect from './config/dbConnect';

    // env config
dotenv.config({ path: './config/files.env'});

class App {
  // express app
  public express: express.Application ;

  // express middleware
  constructor(){
    dbConnect();
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false}));
  };
  // Api config
  private routes(): void {
    this.express.use('/user', appRouter);
  };

}

export default new App().express ;