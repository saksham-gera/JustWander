const express = require("express");
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");


router
    .route("/")
    //index Route
    .get(wrapAsync(listingController.index))
    //create Route
    .post(isLoggedIn,  upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//new Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
    .route("/:id")
    //show Route
    .get(wrapAsync(listingController.showListing))
    //update Route
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    //delete Route    
    .delete(isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));

//edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;