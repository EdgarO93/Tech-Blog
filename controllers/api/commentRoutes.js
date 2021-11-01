const router = require('express').Router();
const { Project, User,Comments  }= require('../../models');
const withAuth = require('../../utils/auth');

//get all the comments
router.get("/", (req, res) => {
  Comments.findAll({
    attributes: ["id", "comments_text", "user_id", "project_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
  }) //include the posts and comments of this user
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get comment by id
router.get("/:id", (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "comments_text", "user_id", "project_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) //include the posts and comments of this user
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add comment
router.post("/", (req, res) => {
  //expects comment_text, user_id, post_id
  Comments.create({
    comments_text: req.body.comments_text,
    user_id: req.session.user_id,
    project_id: req.body.project_id,
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});
//update comment
router.put("/", (req, res) => {
  res.send(`update comment`);
});
//remove comment
router.delete("/:id", (req, res) => {
  Project.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CommentData) => {
      if (!CommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;