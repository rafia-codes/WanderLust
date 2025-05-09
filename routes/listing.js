const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync');
const Listing=require('../models/listing');
const {isLoggedIn, isOwner,validateListing}=require('../middleware');
const listingController=require('../controllers/listings');
const {storage}=require('../cloudConfig');
const multer  = require('multer');
const upload = multer({storage });

// router.route("/")
// .get(wrapAsync(listingController.index))
// .post(isLoggedIn,validateListing,wrapAsync(listingController.create));
   
//HOME
router.get("/",wrapAsync(listingController.index));

//CREATE
router.get("/new",isLoggedIn,listingController.renderNew);

router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.create));

//READ
router.get("/:id",wrapAsync(listingController.show));

//EDIT
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editForm));

router.patch("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.editingListing));

//DELETE
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));

module.exports=router;