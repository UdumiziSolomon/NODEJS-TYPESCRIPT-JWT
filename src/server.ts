  'use strict';
import App from './app';
import * as http from 'http';
import { debug } from 'console';
import mongoose from 'mongoose';
const NAMESPACE = 'Server';


  // port
  const port = process.env.PORT || 4041 ;
  App.set('port', port); 

const server = http.createServer(App) ;
// Check for express error
const onError = (error: NodeJS.ErrnoException) : void => {
  if(error.syscall !== 'listen') throw error ;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port ;
  switch(error.code) {
    case 'EACESS' :
      console.error(NAMESPACE, `${bind} requires elevated privileges!!`);
      process.exit(1);
    break ;
    case 'EADDRINUSE' :
      console.error(`${bind} is already in use!!`);
      process.exit(1);
      break ;
      default: 
      throw error;
  }
};

  
// listen fn
const onListening = (): void => {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? 'Pipe ' + port : 'Port ' + port ;
  debug(NAMESPACE, `Listening to ${bind}`, addr);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
