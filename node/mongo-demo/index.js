const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...',err));


const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true ,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web','mobile','network'],
        lowercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});    

const Course = mongoose.model('Course',courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        category: 'Web',
        author: 'Mosh 3',
        tags: ["frontend"],
        isPublished: true,
        price: 15
    });
    
    try{
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
}

createCourse();

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

//updateCourse('5dcfaa84d39a6225ac29b717');