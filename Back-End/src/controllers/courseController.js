import Course from "../models/courseModel.js";


// CREATE COURSE
 const createCourse = async (req, res) => {
  try {


      const existingCourse = await Course.findOne({
        title: req.body.title,
      });

      if (existingCourse) {
        return res.status(400).json({
          message: "Course already exists",
        });
      }

    const newCourse = new Course({
      title: req.body.title,
      discription: req.body.discription,
      price: req.body.price,
      duration: req.body.duration,
      thumbnail: req.body.thumbnail,
      instructor: req.user.id,
      status: req.body.status || "Active",
      thumbnail: req.file ? req.file.path : undefined,
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// GET ALL COURSE
 const getCourses = async (req, res) => {
  try {
    const {search , page = 1, limit = 10, minPrice, maxPrice} = req.query;
    const query = {status:"Active"};

    if(search){
        query.title = {$regex: search, $options:"i"}
    }

    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }


    const total = await Course.countDocuments(query);

    const courses = await Course.find(query)
    .populate("instructor", "name email")
    .skip((page-1)*limit)
    .limit(Number(limit));
    

    res.status(200).json({
        totalCourses:total,
        page:Number(page),
        limit:Number(limit),
        courses,
  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE COURSE
 const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email",
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Invalid course ID" });
  }
};
 
// UPDATE COURSE
 const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      req.user.role === "instructor" &&
      course.instructor.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "You cannot update this course" });
    }

    course.title = req.body.title || course.title;
    course.discription = req.body.discription || course.discription;
    course.price = req.body.price || course.price;
    course.duration = req.body.duration || course.duration;
    course.thumbnail = req.body.thumbnail || course.thumbnail;
    course.status = req.body.status || course.status;

    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE COURSE

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
