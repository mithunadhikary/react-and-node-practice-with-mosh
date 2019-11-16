const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...',err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});    

const Course = mongoose.model('Course',courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh 3',
        tags: ['frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

//createCourse();

async function getCourse() {
    const courses = await Course
        .find({author:'Mosh', isPublished: true})
        .limit(10)
        .sort({name:1})
        .select({name:1, author: 1});
    console.log(courses);
}

//getCourse();

async function updateCourse(id){
    const course = await Course.findById(id);

    if(!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}

updateCourse('5dcfaa84d39a6225ac29b717');