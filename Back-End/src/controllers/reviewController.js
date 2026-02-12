import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js";

const addReview = async (req, res) => {
  const { rating, review } = req.body;
  const courseId = req.params.courseId;

  try {

    const alreadyReviewed = await Review.findOne({
      course: courseId,
      student: req.user.id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this course",
      });
    }

    const newReview = await Review.create({
      course: courseId,
      student: req.user.id,
      rating,
      review,
    });

    const reviews = await Review.find({ course: courseId });

    let total = 0;

    reviews.forEach((r) => {
      total += r.rating;
    });

    const avg = total / reviews.length;

    await Course.findByIdAndUpdate(courseId, {
      averageRating: avg,
      totalReviews: reviews.length,
    });

    res.status(201).json({
      message: "Review added",
      review:newReview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addReview;
