const express=require("express");
const dotenv=require("dotenv");
const cors =require("cors");
const Connection=require("./db");
const clientRoutes=require("./routes/client")
const authRoutes=require("./routes/clientAuth")
const guestRoutes=require("./routes/Guest")
const roomsRoutes=require("./routes/room")
const path=require("path")



dotenv.config();
Connection();

const app=express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));
//Routes
app.use("/api/clients",clientRoutes);
app.use("/api/login",authRoutes);
app.use("/api/guestBooking",guestRoutes);
app.use("/api/rooms",roomsRoutes)



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


//listening
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Listening to ${port}..`);
})
