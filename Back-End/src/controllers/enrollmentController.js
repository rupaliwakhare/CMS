import  Enrollment from "../models/enrollementModel.js"

const enrollCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: req.params.courseId,
    });

    res.status(201).json({
      message: "Course enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};


const getMyCourses = async (req, res) => {
  try {
    const courses = await Enrollment.find({
      student: req.user.id,
    }).populate("course");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch courses" });
  }
};




export {enrollCourse, getMyCourses}