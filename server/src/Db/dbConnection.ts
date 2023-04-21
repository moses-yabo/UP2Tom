import  mongoose from "mongoose";
import {connectionUrl} from "../config.db"


export const connection = (()=>{
    const db = mongoose.connection;

    try {
        mongoose.connect(connectionUrl);

        db.once('open', function () {
            console.log('Connected to MongoDB');
          });
    } catch (error) {
        db.on('error', console.error.bind(console, 'connection error:',error));
        db.on('close',(err)=>{
            console.error.bind(console,"ol",err);
        })

    }
    

})



