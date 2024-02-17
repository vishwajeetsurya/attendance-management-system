const express = require("express")

const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config({ path: "./.env" })

mongoose.connect(process.env.MONGO_URL)
const app = express()


app.use(express.static(path.join(__dirname, "dist")))
app.use(cors())
app.use(express.json())

app.use("/api/admin", require("./routes/AdminRoutes"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "resource Not foudn" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something Went Wrring" })
})

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RNIING"))
})
