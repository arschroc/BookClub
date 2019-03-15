const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load profile model
const Profile = require("../../models/Profile");
//Load user model
const User = require("../../models/User");

//Load validation
const validateProfileInput = require("../../validation/profile");
const isEmpty = require("../../validation/is-empty");

//Test Route
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        //Check if no profile made yet
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create/edit current users profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const errors = validateProfileInput(req.body);
    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;

    //Check if creting or editing profile
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err));
      } else {
        //Create
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(404).json(errors);
          }

          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
