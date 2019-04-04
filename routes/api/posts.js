const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Past model
const Post = require("../../models/Posts");
//Load profile model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");
const isEmpty = require("../../validation/is-empty");

//Test Route
// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route   GET api/posts
// @desc    Get all posts route
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) //sort by most recent
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostFound: "No posts found" }));
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ postNotFound: "No post found" }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = validatePostInput(req.body);
    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile === null) {
          return res.status(401).json({
            text: "User must create a profile before they can post"
          });
        } else {
          const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
            handle: profile.handle
          });

          newPost.save().then(post => res.json(post));
        }
      })
      .catch(err => {
        return res.status(401).json({
          text: "User must create a profile before they can post"
        });
      });
  }
);

// @route   DELETE api/posts/:post_id
// @desc    Delete post
// @access  Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route   POST api/posts/likes/:post_id
// @desc    Like or unlike a post
// @access  Private
router.post(
  "/likes/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          //If the user has already liked the post unlike it
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //Splice the user id out of array
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          }
          //If the user has not liked the post, like it now
          else {
            //Add the user id to the likes array
            post.likes.unshift({ user: req.user.id });
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route   POST api/posts/comment/:com_id
// @desc    Add a comment to a post
// @access  Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //check validation of form
      const errors = validatePostInput(req.body);
      if (!isEmpty(errors)) {
        return res.status(400).json(errors);
      }

      Post.findById(req.params.post_id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };

          //Add to comments array
          post.comments.unshift(newComment);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

// @route   DELETE api/posts/comment/:post_id/:com_id
// @desc    Remove a comment from a post
// @access  Private
router.delete(
  "/comment/:post_id/:com_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        //check to see if comment exists

        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.com_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        //If it exists then get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.com_id);

        //And splice out of array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

module.exports = router;
