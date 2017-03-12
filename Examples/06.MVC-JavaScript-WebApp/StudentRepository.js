class StudentRepository {
    constructor() {
        this.fs = require('fs-promise');
    }

    async getStudents() {
        const data = await this.fs.readFile('data/student.json');
        let students = JSON.parse(data);
        //Only return the student Id and names
        students = students.map(s => {
            return {
                studentId: s.studentId,
                name: `${s.studentId} - ${s.firstname} ${s.lastname}`
            }
        });
        return students;
    }

    async getStudent(studentId) {
        const data = await this.fs.readFile('data/student.json');
        let students = JSON.parse(data);
        let student = students.find(s => s.studentId === studentId);
        if (student != "undefined") {
            return student;
        }
        else {
            throw new Error("No records found");
        }
    }

    async getCourses(courseIds) {
        const data = await this.fs.readFile('data/course.json');
        let courses = JSON.parse(data);
        courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
        //console.log(courses);
        return courses;
    }

    async getCourseInstructor(course) {
        const data = await this.fs.readFile('data/staff.json');
        let instructors = JSON.parse(data);
        course.instructor = instructors.find( ins => ins.staffNo === course.instructorId );
        delete course.instructor.password;  //No need to return the password attribute
        return course;
    }

// create a new "async" function so we can use the "await" keyword
    async getStudentCourses(studentId) {
        let student = await this.getStudent(studentId);
        let courses = await this.getCourses(student.courseIds);
        //Get instructor details for each course
        student.courses = await Promise.all( courses.map(course => this.getCourseInstructor(course)) );
        return student;
    }

    /*
     let studentId = 2015002;
     getStudentCourses(studentId)
     .then( student =>  console.log( JSON.stringify(student, null, 2) ) )
     .catch( err => console.log(err) );

     //JSON.stringify(student, null, 2) is used to display a pretty-printed multiline JSON representation indented with 2 spaces
     */
}

module.exports = new StudentRepository();