const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json())

const courses = [
    { id: 1, name: "cource1" },
    { id: 2, name: "cource2" },
    { id: 3, name: "cource3" },
]


app.get("/", (req, res) => {
    res.send("Hello World!!!!");
})

app.get("/api/courses/", (req, res) => {
    console.log("查询所有课程");
    res.send(courses);
})

app.get("/api/courses/:id", (req, res) => {
    console.log("查询单个课程");
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The cource Id you have given has not found");
    res.send(course);
})

app.post("/api/courses/", (req, res) => {
    const { error } = validateCourses(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The cource Id you have given has not found");
    const { error } = validateCourses(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
})

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The cource Id you have given has not found");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));

function validateCourses(course) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(course, schema);
}