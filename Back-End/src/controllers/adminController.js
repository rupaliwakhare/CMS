import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import  Enrollment from "../models/enrollementModel.js"


const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const courses = await Course.countDocuments();
    const enrollments = await Enrollment.countDocuments();

    res.json({
      totalUsers: users,
      totalCourses: courses,
      totalEnrollments: enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getStats;
