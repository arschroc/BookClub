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

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id }) //grabs id from input
    .populate("user", ["name", "avatar"])
    .then(profile => {
      //Check if no profile for user id
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle }) //grabs by handle
    .then(profile => {
      //Check if no profile
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      //If profiles is null no proifle is made yet
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   POST api/profile/booksread
// @desc    Create and add a book read to profile
// @access  Private
router.post(
  "/booksread",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishdate: req.body.publishdate,
        averagerating: req.body.averagerating,
        thumbnail: req.body.thumbnail,
        link: req.body.link
      };

      //Add to array
      profile.booksread.unshift(newBook);
      //save and add new experience array
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/bookstoread
// @desc    Create and add a book wanted to read to profile (wishlist)
// @access  Private
router.post(
  "/bookstoread",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishdate: req.body.publishdate,
        averagerating: req.body.averagerating,
        thumbnail: req.body.thumbnail,
        link: req.body.link
      };

      //Add to array
      profile.bookstoread.unshift(newBook);
      //save and add new experience array
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/booksread/:br_id
// @desc    Delete a book read from profile
// @access  Private
router.delete(
  "/booksread/:br_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Ger removal index
        const removeIndex = profile.booksread
          .map(item => item.id)
          .indexOf(req.params.br_id);

        //Splice out of array
        profile.booksread.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/bookstoread/:btr_id
// @desc    Delete a book to read from profile
// @access  Private
router.delete(
  "/bookstoread/:btr_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Ger removal index
        const removeIndex = profile.bookstoread
          .map(item => item.id)
          .indexOf(req.params.brt_id);

        //Splice out of array
        profile.bookstoread.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete current user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id }).then(() => {
        res.json({ sucess: true });
      });
    });
  }
);

module.exports = router;
