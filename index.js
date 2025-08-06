const express = require("express");
const app = express();
const PORT = 3000;
const bookRouters=require('./routes/books')

app.use(express.json())
app.use("/books",bookRouters)

app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.listen(PORT, () => {
    console.log("Server is running!");
});
