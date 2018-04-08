const express = require("express");
const app = express();

const cources = [
    { id: 1, name: "cource1" },
    { id: 2, name: "cource2" },
    { id: 3, name: "cource3" },
]

app.get("/", (req, res) => {
    res.send("Hello World!!!!");
})
app.get("/api/cources/", (req, res) => {
    console.log("查询所有课程");
    res.send(cources);
})
app.get("/api/cources/:id", (req, res) => {
    console.log("查询单个课程");
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) res.status(404).send("The cource Id you have given has not found");
    res.send(cource);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));