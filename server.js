const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");

//allow by cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ task: "url node home" });
});

app.get("/tasks", db.listTasks);
app.get("/task/:id", db.showTasks);
app.post("/task/add", db.addTasks);
app.put("/task/edit/:id", db.updateTasks);
app.delete("/task/delete/:id", db.delTasks);


app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
});