const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];

app.get('/',(req, res) => {
    res.send('Hello World !!');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.send(404).send('Id not found');
    res.send(course);
});

app.post('/api/courses',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Id not found');

    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course2 = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course2);
    res.send(course2);
});

app.put('/api/courses/:id',(req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Id not found');
  
    const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);        

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}

app.delete('/api/courses/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port }`));