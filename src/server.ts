/* eslint-disable no-console */

import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVariable } from "./config/env";



let server: Server;




const startServer = async () => {
    try {
        await mongoose.connect(envVariable.DB_URL)

        console.log("connected to db with mongoose")

        server = app.listen(envVariable.PORT, () => {
            console.log(`server is listening to port ${envVariable.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()


process.on("SIGTERM",()=>{
    console.log("sigterm signal recived .... Serving shutting down")

    if(server){
        server.close(()=>{
            process.exit(1)
        })
        
    }
    process.exit(1)
})


process.on("unhandledRejection",(err)=>{
    console.log("unhandled Rejection decteded .... Serving shutting down", err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
        
    }
    process.exit(1)
})
process.on("uncaughtException",(err)=>{
    console.log("uncaught Exception decteded .... Serving shutting down", err)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
        
    }
    process.exit(1)
})

// Promise.reject(new Error("I forgot to catch this Promise"))

// throw new Error("I forgot to catch this local error")


// unhandled rejection error
// uncaught rejection error
// signal termination sigterm



