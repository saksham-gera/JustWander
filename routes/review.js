const express = require("express");
const router = express.Router({mergeParams: true}); 
//mergeParams is used to take on id from parent route to child routes of review.js if we do not use this id will not be passed on to review.js
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Post Route
router.post("/",isLoggedIn, validateReview , wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;