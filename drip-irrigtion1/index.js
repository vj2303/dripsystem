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
    const updatedSwitch = await on_off.findByIdAndUpdate("6515514dc35e6801b03d4df5", {on : on}) //Add the id of value your document
    await updatedSwitch.save()
    res.json({on})
    } catch (error) {
        res.json({message : error.message})
    }
})

app.get("/get_on_off", async(req, res) => {
    try {
        const on = await on_off.findOne()
        res.json({on})
    } catch (error) {
        res.json({message : error.message})
    }
})

app.listen(5000, ()=>{
    console.log("Server is runnig on PORT 5000");
})