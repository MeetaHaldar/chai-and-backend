// require("dotenv").config({ path: "./env" });
import connectDB from "./db/index.js";
import express from "express";
import { app } from "./app.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is runnig on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed", error);
  });

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     app.on("error", ()=>{
//         console.log("ERROR")
//         throw error;
//     })

//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// })();
