const express = require("express")
const cors = require("cors")
const db = require("./db")
const on_off = require("./models/on_off")
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())
db()

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

app.post("/on_off", async(req, res) => {
    try {
        const { on } = req.body
    const ON_OFF = await on_off.create({
        on
    })
    await ON_OFF.save()
    res.json({on})
    } catch (error) {
        res.json({message : error.message})
    }
})

app.listen(5000, ()=>{
    console.log("Server is runnig on PORT 5000");
})